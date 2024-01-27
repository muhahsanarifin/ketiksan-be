const controller = require("../controllers/portofolio");
const check = require("../middlewares/check");
const validate = require("../middlewares/validate");
const { getTitlePortofolio } = require("../models/portofolio");

const portofolioRoute = (fastify, _, done) => {
  fastify.register((fastify, _, done) => {
    fastify.get("/", controller.getPortofolio);
    fastify.get("/:id", controller.getPortofolioById);
    fastify.register((fastify, _, done) => {
      fastify.addHook("onRequest", async (request, reply) => {
        await check.access(request, reply);
        await check.allowedByRoles(["admin"], request, reply);
      });
      fastify.register((fastify, _, done) => {
        fastify.addHook("preHandler", async (request, reply) => {
          await validate.body(request, reply, [
            "title",
            "description",
            "url_resource",
            "url_deploy",
            "tech_used",
            "category_portofolio_id",
          ]);
          await validate.duplicate(
            request,
            reply,
            getTitlePortofolio(request.body)
          );
        });
        fastify.post("/create", controller.createPortofolio);
        done();
      });
      fastify.patch("/:id/update", controller.updatePortofolio);
      fastify.delete("/:id/delete", controller.deletePortofolioById);
      done();
    });
    done();
  });
  done();
};

module.exports = portofolioRoute;
