const Koa = require("koa");
const Router = require("@koa/router");
const cors = require("@koa/cors");
const { PrismaClient } = require("@prisma/client");
const { bodyParser } = require("@koa/bodyparser");

const app = new Koa();
const router = new Router();
const prisma = new PrismaClient();

const { authenticate } = require("./lib.js");

// initializeApp({
//   credential: cert(require("../firebase.json")),
// });

// app.context.auth = getAuth();
app.context.prisma = prisma;

app.use(cors());

require("./routes").forEach((route) => {
  if (route.nest) {
    router.use(
      `/${route.path}`,
      route.router.routes(),
      route.router.allowedMethods()
    );
  } else {
    route.init(router);
  }
});

app.use(authenticate);
app.use(
  bodyParser({
    jsonStrict: true,
  })
);
// app.use((context, next) => {
//   console.log(context.request.path);
//   next();
// });
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8180);
