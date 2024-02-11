const { updateEducation } = require("../db/education");
const model = require("../models/education");

module.exports = {
  createEducation: async (request, reply) => {
    try {
      const response = await model.createEducation(request.body);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  getEducation: async (request, reply) => {
    try {
      const response = await model.getEducation(request.query);
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
  getEducationById: async (request, reply) => {
    try {
      const response = await model.getEducationById(request.params);
       reply.code(200).send({ ...response, data: response.data[0] });
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },

  updateEducation: async (request, reply) => {
    try {
      const response = await model.updateEducation(
        request.params,
        request.body
      );
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  deleteEducation: async (request, reply) => {
    try {
      const response = await model.deleteEducation(request.params);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
};
