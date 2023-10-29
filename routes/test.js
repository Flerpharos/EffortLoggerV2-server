// const { authorize } = require("../lib.js");
// const { randomBytes } = require("crypto");

function init(router) {
  const MAX_ROWS = 100;

  router.get("/tables/:table", async (context, next) => {
    const tableName = context.params.table;

    /** @type {import("@prisma/client").PrismaClient} */
    const Prisma = context.prisma;

    const table = Prisma[tableName];

    if (table == undefined || table == null) {
      context.throw(404, "No table with that name!");
    }

    const id = context.headers["X-Data-ID"];

    try {
      if (id == null || id == undefined) {
        context.body = await table.getMany();
      } else {
        context.body = await table.findUnique({
          where: {
            id,
          },
        });
      }
    } catch (err) {
      context.throw(500, err.message);
    }
  });
  router.put("/tables/:table", async (context, next) => {
    const tableName = context.params.table;

    /** @type {import("@prisma/client").PrismaClient} */
    const Prisma = context.prisma;

    const table = Prisma[tableName];

    if (table == undefined || table == null) {
      context.throw(404, "No table with that name!");
    }

    const count = await table.count();
    if (count >= MAX_ROWS) {
      context.throw(403, "Too many rows");
    }

    const id = context.headers["X-Data-ID"];

    try {
      if (id == null || id == undefined) {
        context.body = await table.create({ data: context.request.body });
      } else {
        context.body = await table.create({
          data: { ...context.request.body, id },
        });
      }
    } catch (err) {
      context.throw(500, err.message);
    }
  });
  router.post("/tables/:table", async (context, next) => {
    const tableName = context.params.table;

    /** @type {import("@prisma/client").PrismaClient} */
    const Prisma = context.prisma;

    const table = Prisma[tableName];

    if (table == undefined || table == null) {
      context.throw(404, "No table with that name!");
    }

    const id = context.headers["X-Data-ID"];

    if (id == null || id == undefined) {
      context.throw(409, "Need ID field");
    }

    try {
      await table.update({
        where: {
          id,
        },
        // XXX implement some form of data validation
        data: context.request.body,
      });

      context.body = {
        ok: true,
      };
    } catch (err) {
      context.throw(500, err.message);
    }
  });

  router.del("/tables/:table", async (context, next) => {
    const tableName = context.params.table;

    /** @type {import("@prisma/client").PrismaClient} */
    const Prisma = context.prisma;

    const table = Prisma[tableName];

    if (table == undefined || table == null) {
      context.throw(404, "No table with that name!");
    }

    const id = context.headers["X-Data-ID"];

    if (id == null || id == undefined) {
      context.throw(409, "Need ID field");
    }

    try {
      await table.delete({
        where: {
          id,
        },
      });

      context.body = {
        ok: true,
      };
    } catch (err) {
      context.throw(500, err.message);
    }
  });
}

module.exports = { init };
