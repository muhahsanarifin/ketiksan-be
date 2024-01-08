const fastify = require("fastify")();

fastify.register(require("fastify-bcrypt"), {
  saltWorkFactor: 12,
});

module.exports = {
  default: (value, exist) => {
    return value ? value : exist;
  },
  hash: async (password) => {
    return await fastify.bcrypt.hash(password);
  },
  compare: async (password, hash) => {
    return await fastify.compare(password, hash);
  },
};
