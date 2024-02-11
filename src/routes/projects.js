const controller = require("../controllers/projects");
const check = require("../middlewares/check");

const projectsRoute = (fastify, _, done) => {
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin", "recruiter"], request, reply);
    });
    fastify.get("/", controller.getProjects);
    done();
  });
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin"], request, reply);
    });
    fastify.get("/:id", controller.getProjectsById);
    fastify.post("/create", controller.createProjects);
    fastify.patch("/:id/update", controller.updateProjects);
    fastify.delete("/:id/delete", controller.deleteProjects);
    done();
  });
  done();
};

module.exports = projectsRoute;
