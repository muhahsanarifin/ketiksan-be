const controller = require("../controllers/form");

const formRoute = (fastify, _, done) => {
  //// Bio
  fastify.register(
    (fastify, _, done) => {
      fastify.post("/create", controller.createBio);
      fastify.delete("/:id/delete", controller.deleteBioById);
      done();
    },
    { prefix: "/bio" }
  );

  //// Invitation
  fastify.register(
    (fastify, _, done) => {
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
