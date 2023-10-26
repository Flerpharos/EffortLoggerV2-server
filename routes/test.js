// const { authorize } = require("../lib.js");
// const { randomBytes } = require("crypto");

function init(router) {
  router.get("/tables/users", async (context, next) => {
    const current = [
      {
        username: "Test username",
        password: "Test password (should be a hash)",
        role: 0,
      },
      {
        username: "User 2",
        password: "random numbers 2312347912",
        role: 1,
      },
      {
        username: "1320908",
        password: "98-0hf08-283hn123ki98y97(*!@Y#!@)+#)J",
        role: 2,
      },
    ];

    context.body = current;
  });

  router.get("/tables/effortlog", async (context, next) => {
    const current = [
      {
        id: 0,
        start: new Date("Jan 3 2023 18:32:00"),
        end: new Date("Jan 3 2023 18:31:00"),
        lifeCycle: "this should register as invalid",
        effortCategory: "uhoh",
        deliverable: "deliver us",
      },
      {
        id: 1,
        start: new Date("Jan 1 2023 18:32:00"),
        end: new Date("Jan 2 2023 18:31:00"),
        lifeCycle: "test lifecycle",
        effortCategory: "test effort type",
        deliverable: "test deliverable",
      },
    ];
  });

  router.get("/tables/backuplog", async (context, next) => {
    const current = [
      {
        id: 0,
        start: new Date("Jan 3 2023 18:32:00"),
        end: new Date("Jan 3 2023 18:31:00"),
        lifeCycle: "this should register as backup invalid",
        effortCategory: "uhoh",
        deliverable: "deliver us",
      },
      {
        id: 1,
        start: new Date("Jan 1 2023 18:32:00"),
        end: new Date("Jan 2 2023 18:31:00"),
        lifeCycle: "test backup",
        effortCategory: "test effort type",
        deliverable: "test deliverable",
      },
    ];
  });
}

module.exports = { init };
