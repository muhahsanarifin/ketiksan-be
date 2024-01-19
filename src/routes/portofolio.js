const controller = require("../controllers/portofolio");
const check = require("../middlewares/check");

const portofolioRoute = (fastify, _, done) => {
  fastify.register(
    (fastify, _, done) => {
      fastify.get("/", controller.getPortofolio);
      fastify.get("/:id", controller.getPortofolioById);
      fastify.register((fastify, _, done) => {
        fastify.addHook("onRequest", async (request, reply) => {
          await check.access(request, reply);
        });
        fastify.post("/create", controller.createPortofolio);
        fastify.patch("/id:/update", controller.updatePortofolio);
        fastify.delete("/:id/delete", controller.deletePortofolioById);
        done();
      });
      done();
    },
    { prefix: "/portofolio" }
  );
  done();
};

module.exports = portofolioRoute;
