// const permission = require("../permission.json");

/**
 * @async
 * @param {import("koa").Context} context
 * @param {import("koa").Next} next
 * @returns {Promise<void>}
 */
async function authenticate(context, next) {
  const auth = context.get("authorization");

  if (auth == "") {
    context.throw(401, "No Authorization");
  }

  const [type, token] = auth.split(" ");

  if (type != "Bearer") {
    // context.set("WWW-Authenticate", "Bearer realm=cse360.flerp.dev");
    context.throw(401, "Wrong Authorization Type");
  }

  // TODO

  //   /** @type {import("firebase-admin/lib/auth/auth").Auth}*/
  //   const Auth = context.auth;
  //   /** @type {import("@prisma/client").PrismaClient} */
  //   const Prisma = context.prisma;

  let errorIn = false;

  try {
    // context.state.token = await Auth.verifyIdToken(token);

    const [username, password] = atob(token).split(" ", 2);

    if (
      username == process.env.BEARER_UNAME &&
      password == process.env.BEARER_PASWD
    );
    else throw new Error("Incorrect token");

    // const { uid } = context.state.token;

    // context.state.user = await Prisma.user.upsert({
    //   where: { id: uid },
    //   create: {
    //     id: uid,
    //     email: context.state.token.email,
    //     discord: "",
    //   },
    //   update: {},
    // });

    try {
      await next();
    } catch (err) {
      errorIn = true;

      const { statusCode, message } = err;

      const status = parseInt(statusCode);
      context.status = Number.isNaN(status) ? 500 : status;

      if (statusCode == 500) {
        throw err;
      } else {
        console.log(message);
        context.set(
          "x-error-message",
          // TODO Prisma is giving overly detailed error messages. Make sure to trim them down.
          encodeURIComponent(new String(message).trim())
        );
      }
    }
  } catch (err) {
    // context.set(
    //   "WWW-Authenticate",
    //   `Bearer realm=cse360.flerp.dev,error=invalid_token,error_description=${err.message}`
    // );
    console.error(err);

    if (!errorIn) context.throw(401, "Invalid Token: " + err.message);
    else throw err;
  }
}

/**
 * @async
 * @param {import("koa").Context} context
 * @param {string} serviceName
 * @returns {Promise<boolean>}
 */
async function authorize(context, serviceName) {
  // TODO

  return 1;

  /** @type {import("@prisma/client").PrismaClient} */
  const Prisma = context.prisma;

  //   const Service = await Prisma.accessControl.findUnique({
  //     select: { permission: true },
  //     where: {
  //       service_name: serviceName,
  //     },
  //   });

  if (!Service) {
    throw new Error(`No such service ${serviceName}`);
  }

  /** @type {{permission: number;}?} */
  const User = context.state.user;

  return User?.permission ?? permission.DEFAULT >= Service.permission;
}

/**
 * @type {Object} obj
 * @type {string[]} filters
 */
function exclude(obj, filters) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !filters.includes(key))
  );
}

module.exports = { authenticate, authorize, exclude };
