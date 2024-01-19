const controller = require("../controllers/form");
const check = require("../middlewares/check");

const formRoute = (fastify, _, done) => {
  //// Bio
  fastify.register(
    (fastify, _, done) => {
      fastify.post("/create", controller.createBio);
      fastify.register((fastify, _, done) => {
        fastify.addHook("onRequest", async (request, reply) => {
          await check.access(request, reply);
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
