const {
  getProfileByEmail,
  getProfileByKSVUCode,
  getProfileByUsername,
} = require("../models/user");
const random = require("../helpers/random");
const value = require("../helpers/value");

module.exports = {
  body: async (request, reply) => {
    if (!request.body || Object.keys(request.body).length === 0) {
      reply.code(400).send({
        status: "Bad request",
        msg: "Request body is missing",
      });
    }

    if (Object.values(request.body).includes("")) {
      reply.code(400).send({
        status: "Bad Request",
        msg: "Empty input",
      });
    }
  },
  duplicate: async (request, reply, data) => {
    const response = await data;

    if (
      response.data.some((value) =>
        value.title.toLowerCase().includes(request.body.title.toLowerCase())
      )
    ) {
      reply.code(400).send({
        status: "Bad Request",
        msg: `(${request.body.title}) title, already exists`,
      });
    }
  },
  register: async (request, reply) => {
    const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (emailRegex.test(request.body.email) === false) {
      return res.status(400).json({
        status: "Bad Request",
        msg: "Format email is wrong",
      });
    }

    const gtpbuap = await getProfileByEmail(request.body);

    if (gtpbuap.data.length > 0) {
      reply.code(400).send({
        status: "Bad Request",
        msg: `${random.maskedString(request.body.email)} has been registered`,
      });
    }

    const gpbu = await getProfileByUsername(request.body);

    if (gpbu.data.length > 0) {
      reply.code(400).send({
        status: "Bad Request",
        msg: `${random.maskedString(
          request.body.username
        )} has been registered`,
      });
    }

    if (request.body.pass.length < 8) {
      return res.status(400).json({
        status: "Bad Request",
        msg: "Password at least eight characters",
      });
    }

    if (request.body.pass !== request.body.confirmPass) {
      return res.status(400).json({
        status: "Bad Request",
        msg: "Password does not match",
      });
    }
  },
  collect: async (request, reply) => {
    const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (emailRegex.test(request.body.email) === false) {
      return res.status(400).json({
        status: "Bad Request",
        msg: "Format email is wrong",
      });
    }

    const gtpbuap = await getProfileByEmail(request.body);

    if (gtpbuap.data.length > 0) {
      reply.code(400).send({
        status: "Bad Request",
        msg: `${random.maskedString(request.body.email)} has been registered`,
      });
    }

    const gpbu = await getProfileByUsername(request.body);

    if (gpbu.data.length > 0) {
      reply.code(400).send({
        status: "Bad Request",
        msg: `${random.maskedString(
          request.body.username
        )} has been registered`,
      });
    }
  },
  login: async (request, reply) => {
    const loginWith = request.query.with || "ksvu_code";

    if (loginWith === "email") {
      const gtpbe = await getProfileByEmail(request.body);

      if (gtpbe.data.length === 0) {
        reply.code(400).send({
          status: "Bad Request",
          msg: `${random.maskedString(request.body.email)} is not registered`,
        });
      }
      const match = await value.compare(
        request,
        request.body.pass,
        gtpbe.data[0].pass
      );
      if (!match) {
        reply.code(400).send({
          status: "Bad Request",
          msg: "Wrong Password",
        });
      }
    }

    if (loginWith === "username") {
      const gtpbu = await getProfileByUsername(request.body);

      if (gtpbu.data.length === 0) {
        reply.code(400).send({
          status: "Bad Request",
          msg: `${random.maskedString(
            request.body.username
          )} is not registered`,
        });
      }
      const match = await value.compare(
        request,
        request.body.pass,
        gtpbu.data[0].pass
      );
      if (!match) {
        reply.code(400).send({
          status: "Bad Request",
          msg: "Wrong Password",
        });
      }
    }

    if (loginWith === "ksvu_code") {
      const gtpbk = await getProfileByKSVUCode(request.body);
      if (gtpbk.data.length === 0) {
        reply.code(400).send({
          status: "Bad Request",
          msg: `${random.maskedString(
            request.body.ksvu_code
          )} is not registered`,
        });
      }
    }
  },
};
