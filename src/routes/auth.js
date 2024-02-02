/**
 * TODO: Login, Forgot, Reset, Change are able to use ksvu_code or email & password
 */

const controller = require("../controllers/auth");
const validate = require("../middlewares/validate");
const check = require("../middlewares/check");
const { mailer, html } = require("../helpers/mailer");

const authRouter = (fastify, _, done) => {
  fastify.register(require("fastify-bcrypt"), {
    saltWorkFactor: 12,
  });
  fastify.register((fastify, _, done) => {
    fastify.addHook("preHandler", async (request, reply) => {
      await validate.body(request, reply, [
        "email",
        "username",
        "fullname",
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
      await check.allowedByRoles(
        ["admin", "recruiter", "guest"],
        request,
        reply
      );
    });
    fastify.delete("/logout", controller.logout);
    done();
  });
  fastify.register((fastify, _, done) => {
    fastify.addHook("onResponse", async (request, _) => {
      await mailer(
        {
          to: request.body.email,
          subject: `ketiksan | Reset KSVU Code.`,
          html: html({
            title: `Hi, ${request.resetKsvuCodeData.data.fullname}. Your key reset code`,
            description: `<span style="font-weight: bold;">(${request.resetKsvuCodeData.data.key_reset})</span> you can use it to reset your KSVU Code.`,
          }),
        },
        fastify
      );
    });
    fastify.addHook("preHandler", async (request, reply) => {
      await validate.forgetKsvuCode(request, reply);
    });
    fastify.post("/ksvu/forget", controller.forgetKsvuCode);
    done();
  });
  fastify.register((fastify, _, done) => {
    fastify.addHook("onResponse", async (request, _) => {
      await mailer(
        {
          to: request.updateKsvuCodeData.email,
          subject: `ketiksan | New KSVU Code.`,
          html: html({
            title: `Hi, ${request.updateKsvuCodeData.fullname}. Your new KSVU code`,
            description: `<span style="font-weight: bold;">(${request.updateKsvuCodeData.ksvu_code})</span> you can use it to access feed, etc site of ketiksan.`,
          }),
        },
        fastify
      );
    });
    fastify.addHook("preValidation", async (request, reply) => {
      await validate.resetKsvuCode(request, reply);
    });
    fastify.patch("/ksvu/reset", controller.resetKsvuCode);
    done();
  });
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin"], request, reply);
    });
    fastify.addHook("preHandler", async (request, reply) => {
      await validate.changePassword(request, reply);
    });
    fastify.patch("/password/update", controller.changePassword);
    done();
  });
  done();
};

module.exports = authRouter;
