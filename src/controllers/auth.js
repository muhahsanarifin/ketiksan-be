/**
 * TODO: Login, Forgot, Reset, Change are able to use ksvu_code or email & password
 */

const model = require("../models/auth");
const {
  getProfileByKSVUCode,
  updateProfileById,
  getProfileByEmail,
  getProfileByUsername,
} = require("../models/user");
const value = require("../helpers/value");

module.exports = {
  login: async (request, reply) => {
    const loginWith = request.query.with || "ksvu_code";

    try {
      if (loginWith === "email") {
        //// gtpbe = Get profile by email
        const gtpbe = await getProfileByEmail(request.body);
        const payload = {
          ...gtpbe.data[0],
        };
        const token = await reply.jwtSign({ ...payload });
        const response = await Promise.all([
          await model.login(gtpbe.data[0], token),
          await updateProfileById({
            text: "UPDATE profile SET active_login_at = $2 WHERE user_id = $1",
            id: gtpbe.data[0].id,
          }),
        ]);
        reply.code(201).send(response[0]);
      }

      if (loginWith === "username") {
        //// gtpbu = Get profile by username
        const gtpbu = await getProfileByUsername(request.body);
        const payload = {
          ...gtpbu.data[0],
        };
        const token = await reply.jwtSign({ ...payload });
        const response = await Promise.all([
          await model.login(gtpbu.data[0], token),
          await updateProfileById({
            text: "UPDATE profile SET active_login_at = $2 WHERE user_id = $1",
            id: gtpbu.data[0].id,
          }),
        ]);
        reply.code(201).send(response[0]);
      }

      if (loginWith === "ksvu_code") {
        //// gtpbk = Get profile by KSVUCode
        const gtpbk = await getProfileByKSVUCode(request.body);
        const payload = {
          ...gtpbk.data[0],
        };
        const token = await reply.jwtSign({ ...payload });
        const response = await Promise.all([
          await model.login(gtpbk.data[0], token),
          await updateProfileById({
            text: "UPDATE profile SET active_login_at = $2 WHERE user_id = $1",
            id: gtpbk.data[0].id,
          }),
        ]);
        reply.code(201).send(response[0]);
      }
    } catch (error) {
      reply.code(500).send({
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  register: async (request, reply) => {
    try {
      const hash = await value.hash(request, request.body.pass);

      const response = await model.register(request.body, hash);

      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  logout: async (request, reply) => {
    try {
      const response = await model.logout(request.payload);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  forget: async (request, reply) => {
    try {
      const response = await model.forgetKSVUCode(request.body);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        msg: error?.message || "Internal Server Error",
      });
    }
  },

  reset: async (request, reply) => {
    try {
      const response = await model.resetKSVUCode(request.query);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  change: async (request, reply) => {
    try {
      const response = await model.changeKSVUCode(request.body);
      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        msg: error?.message || "Internal Server Error",
      });
    }
  },
};
