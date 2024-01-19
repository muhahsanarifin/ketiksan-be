const controller = require("../controllers/user");
const check = require("../middlewares/check");

const userRoute = (fastify, _, done) => {
  fastify.register(
    (fastify, _, done) => {
      fastify.addHook("onRequest", async (request, reply) => {
        await check.access(request, reply);
      });
      fastify.get("/", controller.getProfile);
      fastify.get("/detail", controller.getProfileById);
      done();
    },
    { prefix: "/profile" }
  );
  fastify.register(
    (fastify, _, done) => {
      fastify.patch("/status", controller.statusAccount);
      done();
    },
    { prefix: "/account" }
  );
  done();
};

module.exports = userRoute;
