const controller = require("../controllers/form");
const check = require("../middlewares/check");
const validate = require("../middlewares/validate");
const { mailer, html } = require("../helpers/mailer");

const formRoute = (fastify, _, done) => {
  //// Bio
  fastify.register(
    (fastify, _, done) => {
      fastify.register((fastify, _, done) => {
        fastify.addHook("preHandler", async (request, reply) => {
          await validate.body(request, reply, [
            "email",
            "username",
            "fullname",
            "job_title",
            "current_company",
          ]);
          await validate.collect(request, reply);
        });
        fastify.addHook("onResponse", async (request, _) => {
          await mailer(
            {
              to: request.body.email,
              subject: `ketiksan | Thanks.`,
              html: html({
                title: `Hi, ${request.bioResponse.data.fullname}. Thanks for your interested to visit ketiksan.`,
                description: `<span style="font-weight: bold;">(${request.bioResponse.data.ksvu_code})</span> you can use it to access feed, etc site of ketiksan.`,
              }),
            },
            fastify
          );
        });
        fastify.post("/create", controller.createBio);
        done();
      });
      fastify.register((fastify, _, done) => {
        fastify.addHook("onRequest", async (request, reply) => {
          await check.access(request, reply);
          await check.allowedByRoles(["recruiter"], request, reply);
        });
        fastify.delete("/:id/delete", controller.deleteBioById);
        done();
      });
      done();
    },
    { prefix: "/bio" }
  );

  //// Invitation
  fastify.register(
    (fastify, _, done) => {
      fastify.addHook("onRequest", async (request, reply) => {
        await check.access(request, reply);
        await check.allowedByRoles(["recruiter"], request, reply);
      });
      fastify.post("/create", controller.createInvitation);
      fastify.get("/", controller.getInvitation);
      fastify.get("/:id", controller.getInvitationById);
      fastify.delete("/:id/delete", controller.deleteInvitationById);
      done();
    },
    { prefix: "/invitation" }
  );
  done();
};

module.exports = formRoute;
