const jwt = require("@fastify/jwt");

const authRouter = require("./auth");
const articleRoute = require("./article");
const formRoute = require("./form");
const portofolioRoute = require("./portofolio");
const userRoute = require("./user");

const routes = (fastify, _, done) => {
  fastify.register(jwt, {
    secret: "KETIKSAN_AUTH_SECRET",
    sign: {
      expiresIn: "1d",
    },
  });
  fastify.register(require("@fastify/middie"));
  fastify.register(authRouter, { prefix: "/auth" });
  fastify.register(articleRoute, { prefix: "/article" });
  fastify.register(formRoute, { prefix: "/form" });
  fastify.register(portofolioRoute, { prefix: "/portofolio" });
  fastify.register(userRoute, { prefix: "/user" });
  done();
};

module.exports = routes;
