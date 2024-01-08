const model = require("../models/portofolio");

module.exports = {
  createPortofolio: async (request, reply) => {
    try {
      const response = await model.createPortofolio(request.body);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  getPortofolio: async (request, reply) => {
    try {
      const response = await model.getPortofolio(request.query);

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
  getPortofolioById: async (request, reply) => {
    try {
      const response = await model.getPortofolioById(request.params);
      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  updatePortofolio: async (request, reply) => {
    try {
      //// apv = available portofolio data
      const apv = await model.getPortofolioById(request.params);

      const response = await model.updatePortofolio(
        request.body,
        request.params,
        apv
      );
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  deletePortofolioById: async (request, reply) => {
    try {
      const response = await model.deletePortofolioById(request.params);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
};
