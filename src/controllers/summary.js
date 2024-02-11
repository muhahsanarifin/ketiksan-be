const model = require("../models/summary");

module.exports = {
  createSummary: async (request, reply) => {
    try {
      const response = await model.createSummary(request.body);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  getSummary: async (request, reply) => {
    try {
      const response = await model.getSummary(request.query);
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
  updateSummary: async (request, reply) => {
    try {
      //// asd = available summary data
      const asd = await model.getSummaryById(request.params);

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
  deleteSummary: async (request, reply) => {
    try {
      const response = await model.deleteSummary(request.params);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
};
