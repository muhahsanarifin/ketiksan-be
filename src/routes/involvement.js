const controller = require("../controllers/involvement");
const check = require("../middlewares/check");

const involvementRoute = (fastify, _, done) => {
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin", "recruiter"], request, reply);
    });
    fastify.get("/", controller.getInvolvement);
    done();
  });
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin"], request, reply);
    });
    fastify.get("/:id", controller.getInvolvementById);
    fastify.post("/create", controller.createInvolvement);
    fastify.patch("/:id/update", controller.updateInvolvement);
    fastify.delete("/:id/delete", controller.deleteInvolvement);
    done();
  });
  done();
};

module.exports = involvementRoute;
