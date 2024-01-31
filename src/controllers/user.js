const model = require("../models/user");

module.exports = {
  getProfile: async (request, reply) => {
    try {
      const response = await model.getProfile(request.query);

      if (response.data.length === 0) {
        reply.code(200).send({
          status: "Seccessful",
          msg: "Empty data",
          data: response.data,
        });
      }

      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  getProfileById: async (request, reply) => {
    try {
      const response = await model.getProfileById(request.payload);
      reply.code(200).send({ ...response, data: response.data[0] });
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  statusAccount: async (request, reply) => {
    try {
      const response = await model.statusAccount(request.body, request.payload);
      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
};
