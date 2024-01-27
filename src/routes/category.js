const controller = require("../controllers/category");
const check = require("../middlewares/check");
const validate = require("../middlewares/validate");

const categoryRoute = (fastify, _, done) => {
  fastify.register(
    (fastify, _, done) => {
      fastify.get("/", controller.getCategoryArticle);
      fastify.register((fastify, _, done) => {
        fastify.addHook("onRequest", async (request, reply) => {
          await check.access(request, reply);
          await check.allowedByRoles(["admin"], request, reply);
        });
        fastify.register((fastify, _, done) => {
          fastify.addHook("preHandler", async (request, reply) => {
            await validate.body(request, reply, ["category"]);
          });
          fastify.post("/create", controller.createCategoryArticle);
          done();
        });
        fastify.patch("/:id/update", controller.updateCategoryArticle);
        fastify.delete("/:id/delete", controller.deleteCategoryArticle);
        done();
      });
      done();
    },
    { prefix: "/article" }
  );
  fastify.register(
    (fastify, _, done) => {
      fastify.get("/", controller.getCategoryPortofolio);
      fastify.register((fastify, _, done) => {
        fastify.addHook("onRequest", async (request, reply) => {
          await check.access(request, reply);
          await check.allowedByRoles(["admin", request, reply]);
        });
        fastify.register((fastify, _, done) => {
          fastify.addHook("preHandler", async (request, reply) => {
            await validate.body(request, reply, ["category"]);
          });
          fastify.post("/create", controller.createCategoryPortofolio);
          done();
        });
        fastify.patch("/:id/update", controller.updateCategoryPortofolio);
        fastify.delete("/:id/delete", controller.deleteCategoryPortofolio);
        done();
      });
      done();
    },
    { prefix: "/portofolio" }
  );
  done();
};

module.exports = categoryRoute;
