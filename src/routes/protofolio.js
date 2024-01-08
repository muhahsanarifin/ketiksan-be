const controller = require("../controllers/portofolio");

const portofolioRoute = (fastify, _, done) => {
  fastify.register(
    (fastify, _, done) => {
      fastify.post("/create", controller.createPortofolio);
      fastify.get("/", controller.getPortofolio);
      fastify.get("/:id", controller.getPortofolioById);
      fastify.patch("/id:/update", controller.updatePortofolio);
      fastify.delete("/:id/delete", controller.deletePortofolioById);
      done();
    },
    { prefix: "/portofolio" }
  );
  done();
};

module.exports = portofolioRoute;
