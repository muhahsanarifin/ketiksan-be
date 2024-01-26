const model = require("../models/category");

module.exports = {
  getCategoryArticle: async (request, reply) => {
    try {
      const response = await model.getCategoryArticle(request.query);

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
  getCategoryArticleById: async (request, reply) => {
    try {
      const response = await model.getCategoryArticleById(request.params);
      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  createCategoryArticle: async (request, reply) => {
    try {
      const response = await model.createCategoryArtcile(request.body);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  deleteCategoryArticle: async (request, reply) => {
    try {
      const response = await model.deleteCategoryArticle(request.params);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  updateCategoryArticle: async (request, reply) => {
    try {
      //// aca = available category article
      const aca = await model.getCategoryArticleById(request.params);

      const response = await model.updateCategoryArticle(
        request.body,
        request.params,
        aca[0]
      );
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  getCategoryPortofolio: async (request, reply) => {
    try {
      const response = await model.getCategoryPortofolio(request.query);

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
  getCategoryPortofolioById: async (request, reply) => {
    try {
      const response = await model.getCategoryPortofolioById(request.params);
      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  createCategoryPortofolio: async (request, reply) => {
    try {
      const response = await model.createCategoryPortofolio(request.body);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  deleteCategoryPortofolio: async (request, reply) => {
    try {
      const response = await model.deleteCategoryPortofolio(request.params);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  updateCategoryPortofolio: async (request, reply) => {
    try {
      //// acp = available category portofolio
      const acp = await model.updateCategoryPortofolio(request.params);

      const response = await model.updateCategoryPortofolio(
        request.body,
        request.params,
        acp[0]
      );
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
};
