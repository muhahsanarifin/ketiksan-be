const controller = require("../controllers/education");
const check = require("../middlewares/check");

const educationRoute = (fastify, _, done) => {
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin", "recruiter"], request, reply);
    });
    fastify.get("/", controller.getEducation);
    done();
  });
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin"], request, reply);
    });
    fastify.get("/:id", controller.getEducationById);
    fastify.post("/create", controller.createEducation);
    fastify.patch("/:id/update", controller.updateEducation);
    fastify.delete("/:id/delete", controller.deleteEducation);
    done();
  });
  done();
};

module.exports = educationRoute;
