const controller = require("../controllers/user");
const check = require("../middlewares/check");
const validate = require("../middlewares/validate");

const userRoute = (fastify, _, done) => {
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin"], request, reply);
    });
    fastify.get("/", controller.getUser);
    fastify.get("/:id", controller.getUserById);
    done();
  });
  fastify.register(
    (fastify, _, done) => {
      fastify.addHook("onRequest", async (request, reply) => {
        await check.access(request, reply);
        await check.allowedByRoles(["admin", "recruiter"], request, reply);
      });
      fastify.get("/detail", controller.getProfileById);
      fastify.patch("/update", controller.updateProfileId);
      done();
    },
    { prefix: "/profile" }
  );
  fastify.register(
    (fastify, _, done) => {
      fastify.addHook("onRequest", async (request, reply) => {
        await check.access(request, reply);
        await check.allowedByRoles(["admin", "recruiter"], request, reply);
      });
      fastify.patch("/status", controller.statusAccount);
      done();
    },
    { prefix: "/account" }
  );
  done();
};

module.exports = userRoute;
