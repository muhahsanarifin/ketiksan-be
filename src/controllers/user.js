const { data } = require("../helpers/value");
const model = require("../models/user");

module.exports = {
  getUser: async (request, reply) => {
    try {
      const response = await model.getUser(request.query);

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
  getUserById: async (request, reply) => {
    try {
      const response = await model.getUserById(request.params);
      reply.code(200).send({ ...response, data: response.data[0] });
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
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
  updateProfileId: async (request, reply) => {
    try {
      const gpdbi = await model.getProfileById(request.payload);

      const response = await Promise.all([
        await model.updateProfileById({
          body: request.body,
          payload: request.payload,
          data: gpdbi.data[0],
        }),
        await model.updateDateProfileById({
          text: "UPDATE profile SET updated_at = $2 WHERE user_id = $1",
          id: gpdbi.data[0].id,
        }),
      ]);
      reply.code(200).send(response[0]);
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
