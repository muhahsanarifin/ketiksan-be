const controller = require("../controllers/coursework");
const check = require("../middlewares/check");

const courseWorkRoute = (fastify, _, done) => {
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin", "recruiter"], request, reply);
    });
    fastify.get("/", controller.getCourseWork);
    done();
  });
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin"], request, reply);
    });
    fastify.post("/create", controller.createCourseWork);
    fastify.patch("/:id/update", controller.updateCourseWork);
    fastify.delete("/:id/delete", controller.deleteCourseWork);
    done();
  });
  done();
};

module.exports = courseWorkRoute;
