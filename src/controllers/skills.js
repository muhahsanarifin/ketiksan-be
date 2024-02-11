const model = require("../models/skills");

module.exports = {
  createSkills: async (request, reply) => {
    try {
      const response = await model.createSkills(request.body);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  getSkills: async (request, reply) => {
    try {
      const response = await model.getSkills(request.query);
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
  getSkillsById: async (request, reply) => {
    try {
      const response = await model.getSkillsById(request.params);
      reply.code(200).send({ ...response, data: response.data[0] });
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  updateSkills: async (request, reply) => {
    try {
      //// asd = available skills data
      const asd = await model.updateSkills(request.params);

      const response = await model.updateArticle(
        request.body,
        request.params,
        asd.data[0]
      );

      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  deleteSkills: async (request, reply) => {
    try {
      const response = await model.deleteSkills(request.params);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
};
