const model = require("../models/projects");

module.exports = {
  createProjects: async (request, reply) => {
    try {
      const response = await model.createProjects(request.body);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  getProjects: async (request, reply) => {
    try {
      const response = await model.getProjects(request.query);
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
  getProjectsById: async (request, reply) => {
    try {
      const response = await model.getProjectsById();
      reply.code(200).send({ ...response, data: response.data[0] });
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  updateProjects: async (request, reply) => {
    try {
      //// apd = available projects data
      const apd = await model.getProjectsById(request.params);

      const response = await model.updateProjects(
        request.body,
        request.params,
        apd.data[0]
      );

      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  deleteProjects: async (request, reply) => {
    try {
      const response = await model.deleteProjects(request.params);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
};
