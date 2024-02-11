const controller = require("../controllers/experience");
const check = require("../middlewares/check");

const experienceRoute = (fastify, _, done) => {
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin", "recruiter"], request, reply);
    });
    fastify.get("/", controller.getExperience);
    done();
  });
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin"], request, reply);
    });
    fastify.get("/:id", controller.getExperienceById);
    fastify.post("/create", controller.createExperience);
    fastify.patch("/:id/update", controller.updateExperience);
    fastify.delete("/:id/delete", controller.deleteExperience);
    done();
  });
  done();
};

module.exports = experienceRoute;
