require("dotenv").config();
const Fastify = require("fastify");
const routes = require("../src/routes/index");
const cors = require("@fastify/cors");
const pinoPretty = require("../src/helpers/logger");
const { fastifyMailer } = require("../src/config/nodemailer");

const fastify = Fastify({
  logger: pinoPretty,
});

fastify.register(require("fastify-mailer"), {
  ...fastifyMailer({
    from: `${process.env.KETIKSAN_NODEMAILER_FROM}`,
    service: `${process.env.KETIKSAN_NODEMAILER_SERVICE}`,
    user: `${process.env.KETIKSAN_NODEMAILER_USER}`,
    pass: `${process.env.KETIKSAN_NODEMAILER_PASS}`,
  }),
});

fastify.register(cors, {
  origin: process.env.BASE_URL,
});
fastify.register(require("@fastify/formbody"));
fastify.register(routes);

export default async (req, res) => {
  await fastify.ready();
  fastify.server.emit("request", req, res);
};
