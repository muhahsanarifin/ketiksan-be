const controller = require("../models/summary");

const summaryRoute = (fastify, _, done) => {
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin", "recruiter"], request, reply);
    });
    fastify.get("/", controller.getSummary);
    done();
  });
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin"], request, reply);
    });
    fastify.post("/create", controller.createSummary);
    fastify.patch("/:id/update", controller.updateSummary);
    fastify.delete("/:id/delete", controller.deleteSummary);
    done();
  });
  done();
};

module.exports = summaryRoute;
