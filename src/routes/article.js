const controller = require("../controllers/article");

const articleRoute = (fastify, _, done) => {
  fastify.post("/create", controller.createArticle);
  fastify.get("/", controller.getArticle);
  fastify.get("/:id", controller.getArticleById);
  fastify.patch("/:id/update", controller.updateArticle);
  fastify.delete("/:id/detete", controller.deleteArticleById);
  done();
};

module.exports = articleRoute;
