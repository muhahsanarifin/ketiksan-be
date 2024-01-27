const model = require("../models/article");

module.exports = {
  createArticle: async (request, reply) => {
    try {
      const response = await model.createArticle(request.body);

      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  getArticle: async (request, reply) => {
    try {
      const response = await model.getArticle(request.query);

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
  getArticleById: async (request, reply) => {
    try {
      const response = await model.getArticleById(request.params);
      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  updateArticle: async (request, reply) => {
    try {
      //// app = available article data
      const aap = await model.getArticleById(request.params);

      const response = await model.updateArticle(
        request.body,
        request.params,
        aap.data
      );

      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  deleteArticleById: async (request, reply) => {
    try {
      const response = await model.deleteArticleById(request.params);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
};
