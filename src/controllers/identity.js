const uploadWithCloudinary = require("../helpers/cloudinary");

const model = require("../models/identity");

module.exports = {
  createIdentity: async (request, reply) => {
    try {
      const response = await model.createIdentity(request.body);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  getIdentity: async (request, reply) => {
    try {
      const response = await model.getIdentity(request.query);
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
  updateIdentity: async (request, reply) => {
    try {
      //// aid = available identity data
      const aid = await model.getIdentityById(request.params);

      const response = await model.updateIdentity({
        body: request.body,
        params: request.params,
        data: aid.data[0],
      });

      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  updateIdentityPicture: async (request, reply) => {
    try {
      const file = await uploadWithCloudinary({
        name: `kip-${request.params.id}`,
        folder: process.env.KETIKSAN_CLOUDINARY_FOLDER,
        file: request.file,
      });

      const response = await model.updateIdentityPicture(request.params, file);

      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  deleteIdentity: async (request, reply) => {
    try {
      const response = await model.deleteIdentity(request.params);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
};
