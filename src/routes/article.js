const controller = require("../controllers/article");
const check = require("../middlewares/check");

const articleRoute = (fastify, _, done) => {
  fastify.get("/", controller.getArticle);
  fastify.get("/:id", controller.getArticleById);
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
    });
    fastify.post("/create", controller.createArticle);
    fastify.patch("/:id/update", controller.updateArticle);
    fastify.delete("/:id/detete", controller.deleteArticleById);
    done();
  });
  done();
};

module.exports = articleRoute;
