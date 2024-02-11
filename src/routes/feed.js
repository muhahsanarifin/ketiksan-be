const controller = require("../controllers/feed");
const check = require("../middlewares/check");

const feedRoute = (fastify, _, done) => {
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin", "recruiter"], request, reply);
    });
    fastify.get("/", controller.getFeed);
    done();
  });
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin"], request, reply);
    });
    fastify.get("/:id", controller.getFeedById);
    fastify.post("/create", controller.createFeed);
    fastify.patch("/:id/update", controller.updateFeed);
    fastify.delete("/:id/delete", controller.deleteFeed);
    done();
  });
  done();
};

module.exports = feedRoute;
