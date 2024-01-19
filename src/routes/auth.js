/**
 * TODO: Login, Forgot, Reset, Change are able to use ksvu_code or email & password
 */

const controller = require("../controllers/auth");
const validate = require("../middlewares/validate");

const authRouter = (fastify, _, done) => {
  fastify.register((fastify, _, done) => {
    fastify.addHook("preHandler", async (request, reply) => {
      await validate.body(request, reply);
    });
    fastify.post("/login", controller.login);
    done();
  });
  fastify.delete("/logout", controller.logout);
  fastify.post("/password/forget", controller.forget);
  fastify.get("/password/reset", controller.reset);
  fastify.patch("/password/update", controller.change);
  done();
};

module.exports = authRouter;
