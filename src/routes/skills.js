const controller = require("../controllers/skills");
const check = require("../middlewares/check");

const skillsRoute = (fastify, _, done) => {
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin", "recruiter"], request, reply);
    });
    fastify.get("/", controller.getSkills);
    done();
  });
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin"], request, reply);
    });
    fastify.get("/:id", controller.getSkillsById);
    fastify.post("/create", controller.createSkills);
    fastify.patch("/:id/update", controller.updateSkills);
    fastify.delete("/:id/delete", controller.deleteSkills);

    done();
  });

  done();
};

module.exports = skillsRoute;
