const { mailer } = require("../helpers/mailer");
const model = require("../models/form");
module.exports = {
  //// Bio controller
  createBio: async (request, reply) => {
    try {
      const response = await model.createBio(request.body);

      request.bioResponse = response;

      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },

  deleteBioById: async (request, reply) => {
    try {
      const response = await model.deleteBioById(request.params);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },

  //// Invitation controller
  createInvitation: async (request, reply) => {
    try {
      const response = await model.createInvitation(
        request.body,
        request.payload
      );
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  getInvitation: async (request, reply) => {
    try {
      const response = await model.getInvitation(request.query);

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
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  getInvitationById: async (request, reply) => {
    try {
      const response = await model.getInvitationById(request.params);
      reply.code(200).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  deleteInvitationById: async (request, reply) => {
    try {
      const response = await model.deleteInvitationById(request.params);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
};
