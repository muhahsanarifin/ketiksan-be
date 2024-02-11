const { updateCourseWork } = require("../db/coursework");
const model = require("../models/coursework");

module.exports = {
  createCourseWork: async (request, reply) => {
    try {
      const response = await model.createCourseWork(request.body);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  getCourseWork: async (request, reply) => {
    try {
      const response = await model.getCoursework(request.query);
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
  getCourseWorkById: async (request, reply) => {
    try {
      const response = await model.getCourseWorkById(request.params);
      reply.code(200).send({ ...response, data: response.data[0] });
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  updateCourseWork: async (request, reply) => {
    try {
      //// acd = available coursework data
      const acd = await model.getCourseWorkById(request.params);

      const response = await model.updateCourseWork(
        request.body,
        request.params,
        acd.data[0]
      );

      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  deleteCourseWork: async (request, reply) => {
    try {
      const response = await model.deleteCourseWork(request.params);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
};
