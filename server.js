require("dotenv").config();
const Fastify = require("fastify");
const routes = require("./src/routes/index");
const cors = require("@fastify/cors");

const start = async () => {
  const fastify = Fastify({
    logger: {
      trasport: {
        target: "@fastify/one-line-logger",
      },
    },
  });

  fastify.register(cors, {
    origin: process.env.BASE_URL,
  });
  fastify.register(require("@fastify/formbody"));
  fastify.register(routes);

  try {
    const address = await fastify.listen({
      port: process.env.FASTIFY_PORT || 3000,
    });
    fastify.log.info(`server listening on ${address}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
