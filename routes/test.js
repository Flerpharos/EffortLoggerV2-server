// const { authorize } = require("../lib.js");
// const { randomBytes } = require("crypto");
const mapping = require("./tables.json");

function init(router) {
  const MAX_ROWS = 100;

  function getTable(context, tableName) {
    if (tableName.startsWith("__")) {
      context.throw(404, `No table with that name (${tableName})!`);
    }

    let table = context.prisma[tableName];

    if (table == undefined || table == null) {
      table = context.prisma[mapping[tableName.toLowerCase()]];
    }

    if (table == undefined || table == null) {
      context.throw(404, `No table with that name (${tableName})!`);
    }

    return table;
  }

  router.get("/tables/:table", async (context, next) => {
    const table = getTable(context, context.params.table);

    const id = context.headers["x-data-id"];

    try {
      if (id == null || id == undefined) {
        context.body = await table.findMany();
      } else {
        context.body = [
          await table.findUnique({
            where: {
              id: parseInt(id),
            },
          }),
        ];
      }
    } catch (err) {
      context.throw(418, err.message);
    }
  });
  router.put("/tables/:table", async (context, next) => {
    const table = getTable(context, context.params.table);

    const count = await table.count();
    if (count >= MAX_ROWS) {
      context.throw(403, "Too many rows");
    }

    const id = context.headers["x-data-id"];

    // XXX implement some form of data validation
    try {
      if (id == null || id == undefined) {
        context.body = [await table.create({ data: context.request.body })];
      } else {
        context.body = [
          await table.create({
            data: { ...context.request.body, id: parseInt(id) },
          }),
        ];
      }
    } catch (err) {
      context.throw(418, err.message);
    }
  });
  router.post("/tables/:table", async (context, next) => {
    const table = getTable(context, context.params.table);

    const id = context.headers["x-data-id"];

    if (id == null || id == undefined) {
      context.throw(409, "Need ID field");
    }

    try {
      context.body = [
        await table.update({
          where: {
            id: parseInt(id),
          },
          // XXX implement some form of data validation
          data: context.request.body,
        }),
      ];
    } catch (err) {
      context.throw(418, err.message);
    }
  });

  router.del("/tables/:table", async (context, next) => {
    const table = getTable(context, context.params.table);

    const id = context.headers["x-data-id"];

    if (id == null || id == undefined) {
      context.throw(409, "Need ID field");
    }

    try {
      await table.delete({
        where: {
          id: parseInt(id),
        },
      });

      context.body = [];
    } catch (err) {
      context.throw(418, err.message);
    }
  });
}

module.exports = { init };
