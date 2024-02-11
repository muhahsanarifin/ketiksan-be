const model = require("../models/experience");

module.exports = {
  createExperience: async (request, reply) => {
    try {
      const response = await model.createExperience(request.body);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  getExperience: async (request, reply) => {
    try {
      const response = await model.getExperience(request.query);
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
  getExperienceById: async (request, reply) => {
    try {
      const response = await model.getExperienceById(request.params);
      reply.code(200).send({ ...response, data: response.data[0]});
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  updateExperience: async (request, reply) => {
    try {
      //// aed = available experience data
      const aed = await model.getExperienceById(request.params);

      const response = await model.updateArticle(
        request.body,
        request.params,
        aed.data[0]
      );

      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  deleteExperience: async (request, reply) => {
    try {
      const response = await model.deleteExperience(request.params);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
};
