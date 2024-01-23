const controller = require("../controllers/form");
const check = require("../middlewares/check");
const validate = require("../middlewares/validate");

const formRoute = (fastify, _, done) => {
  //// Bio
  fastify.register(
    (fastify, _, done) => {
      fastify.register((fastify, _, done) => {
        fastify.addHook("preHandler", async (request, reply) => {
          await validate.register(request, reply);
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
