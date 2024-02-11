const model = require("../models/feed");

module.exports = {
  createFeed: async (request, reply) => {
    try {
      const response = await model.createFeed(request.body);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  getFeed: async (request, reply) => {
    try {
      const response = await model.getFeed(request.query);
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
  getFeedById: async (request, reply) => {
    try {
      const response = await model.getFeedById(request.params);
      reply.code(200).send({ ...response, data: response.data[0] });
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  updateFeed: async (request, reply) => {
    try {
      //// aed = available feed data
      const afd = await model.getFeedById(request.params);

      const response = await model.updateFeed(
        request.body,
        request.params,
        afd.data[0]
      );

      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  deleteFeed: async (request, reply) => {
    try {
      const response = await model.deleteFeed(request.params);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
};
