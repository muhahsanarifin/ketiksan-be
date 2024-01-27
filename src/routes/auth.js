/**
 * TODO: Login, Forgot, Reset, Change are able to use ksvu_code or email & password
 */

const controller = require("../controllers/auth");
const validate = require("../middlewares/validate");
const check = require("../middlewares/check");

const authRouter = (fastify, _, done) => {
  fastify.register(require("fastify-bcrypt"), {
    saltWorkFactor: 12,
  });
  fastify.register((fastify, _, done) => {
    fastify.addHook("preHandler", async (request, reply) => {
      await validate.body(request, reply, [
        "email",
        "username",
        "gender",
        "pass",
        "confirmPass",
        "job_title",
        "current_company",
        "role_user",
      ]);
      await validate.register(request, reply);
    });
    fastify.post("/register", controller.register);
    done();
  });
  fastify.register((fastify, _, done) => {
    fastify.addHook("preHandler", async (request, reply) => {
      await validate.body(request, reply, []);
      await validate.login(request, reply);
    });
    fastify.post("/login", controller.login);
    done();
  });
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin", "recruiter"], request, reply);
    });
    fastify.delete("/logout", controller.logout);
    done();
  });
  fastify.post("/password/forget", controller.forget);
  fastify.get("/password/reset", controller.reset);
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin"], request, reply);
    });
    fastify.patch("/password/update", controller.change);
    done();
  });
  done();
};

module.exports = authRouter;
