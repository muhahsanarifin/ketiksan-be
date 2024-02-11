const jwt = require("@fastify/jwt");

const authRouter = require("./auth");
const articleRoute = require("./article");
const formRoute = require("./form");
const portofolioRoute = require("./portofolio");
const userRoute = require("./user");
const categoryRoute = require("./category");
const identityRoute = require("./identity");
const summaryRoute = require("./summary");
const courseWorkRoute = require("./coursework");
const educationRoute = require("./education");
const experienceRoute = require("./experience");
const feedRoute = require("./feed");
const involvementRoute = require("./involvement");
const skillRoute = require("./skills");
const projects = require("./projects");

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
  fastify.register(categoryRoute, { prefix: "/category" });
  fastify.register(identityRoute, { prefix: "/identity" });
  fastify.register(summaryRoute, { prefix: "/summary" });
  fastify.register(courseWorkRoute, { prefix: "/coursework" });
  fastify.register(educationRoute, { prefix: "/education" });
  fastify.register(experienceRoute, { prefix: "/experience" });
  fastify.register(feedRoute, { prefix: "/feed" });
  fastify.register(involvementRoute, { prefix: "/involvement" });
  fastify.register(skillRoute, { prefix: "/skills" });
  fastify.register(projects, { prefix: "/projects" });

  fastify.get("/", (_, reply) => {
    reply.code(200).send({
      msg: "ketiksan api.",
      description: "ketiksan dibangun menggunakan framework node.js (fastify).",
    });
  });
  done();
};

module.exports = routes;
