const model = require("../models/involvement");

module.exports = {
  createInvolvement: async (request, reply) => {
    try {
      const response = await model.createInvolvement(request.body);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  getInvolvement: async (request, reply) => {
    try {
      const response = await model.getInvolvement(request);
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
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  getInvolvementById: async (request, reply) => {
    try {
      const response = await model.getInvolvementById(request.params);
      reply.code(200).send({ ...response, data: response.data[0] });
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  updateInvolvement: async (request, reply) => {
    try {
      //// aid = available involvement data
      const aid = await model.getInvolvementById(request.params);

      const response = await model.updateInvolvement(
        request.body,
        request.params,
        aid.data[0]
      );

      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  deleteInvolvement: async (request, reply) => {
    try {
      const response = await model.deleteInvolvement(request.params);
       reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
};
