const controller = require("../controllers/user");
const check = require("../middlewares/check");

const userRoute = (fastify, _, done) => {
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin"], request, reply);
    });
    fastify.get("/", controller.getProfile);
    done();
  });
  fastify.register(
    (fastify, _, done) => {
      fastify.addHook("onRequest", async (request, reply) => {
        await check.access(request, reply);
        await check.allowedByRoles(["admin", "recruiter"], request, reply);
      });
      fastify.get("/detail", controller.getProfileById);
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
