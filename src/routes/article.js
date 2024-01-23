const controller = require("../controllers/article");
const check = require("../middlewares/check");
const validate = require("../middlewares/validate");
const { getTitleArticle } = require("../models/article");

const articleRoute = (fastify, _, done) => {
  fastify.get("/", controller.getArticle);
  fastify.get("/:id", controller.getArticleById);
  fastify.register((fastify, _, done) => {
    fastify.addHook("onRequest", async (request, reply) => {
      await check.access(request, reply);
      await check.allowedByRoles(["admin"], request, reply);
    });
    fastify.register((fastify, _, done) => {
      fastify.addHook("preHandler", async (request, reply) => {
        await validate.duplicate(request, reply, getTitleArticle(request.body));
      });
      fastify.post("/create", controller.createArticle);
      done();
    });
    fastify.patch("/:id/update", controller.updateArticle);
    fastify.delete("/:id/delete", controller.deleteArticleById);
    done();
  });
  done();
};

module.exports = articleRoute;
