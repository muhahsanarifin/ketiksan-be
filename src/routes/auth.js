const controller = require("../controllers/auth");

const authRouter = (fastify, _, done) => {
  //// Visitor
  fastify.register(
    (fastify, _, done) => {
      fastify.register((fastify, _, done) => {
        fastify.post("/login", controller.loginByVisitor);
        done();
      });
      fastify.post("/password/forget", controller.forgetKSVUCode);
      fastify.get("/password/reset", controller.resetKSVUCode);
      fastify.patch("/password/update", controller.changeKSVUCode);
      done();
    },
    { prefix: "/visitor" }
  );

  //// Admin
  fastify.register(
    (fastify, _, done) => {
      fastify.post("/login/admin", controller.loginByAdmin);
      fastify.patch("/password/update", controller.changePasswordByAdmin);
      done();
    },
    { prefix: "/admin" }
  );
  done();
};

module.exports = authRouter;
