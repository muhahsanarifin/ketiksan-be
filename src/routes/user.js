const fastify = require("fastify");
const controller = require("../controllers/user");

const userRoute = (fastify, _, done) => {
  fastify.register(
    (fastify, _, done) => {
      fastify.get("/", controller.getProfile);
      fastify.get("/detail", controller.getProfileById);
      done();
    },
    { prefix: "/profile" }
  );
  fastify.register(
    (fastify, _, done) => {
      fastify.patch("/status", controller.statusAccount);
      done();
    },
    { prefix: "/account" }
  );
  done();
};

module.exports = userRoute;
