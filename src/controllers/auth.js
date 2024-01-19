/**
 * TODO: Login, Forgot, Reset, Change are able to use ksvu_code or email & password
 */

const model = require("../models/auth");
const {
  getProfileByKSVUCode,
  updateProfileById,
  getProfileByEmail,
} = require("../models/user");

module.exports = {
  login: async (request, reply) => {
    try {
      if (Object.keys(request.body).includes("username", "password")) {

        //// gtpbuap = Get profile by email
        const gtpbuap = await getProfileByEmail(request.body);

        const payload = {
          ...gtpbuap.data,
        };

        const token = await reply.jwtSign({ ...payload });

        const response = await Promise.all([
          await model.login(gtpbuap.data, token),
          await updateProfileById({
            text: "UPDATE profile SET active_login_at = $2 WHERE user_id = $1",
            id: gtpbuap.data.id,
          }),
        ]);

        reply.code(201).send(response[0]);
      } else if (Object.keys(request.body).includes("ksvu_code")) {

        //// gtpbk = Get profile by KSVUCode
        const gtpbk = await getProfileByKSVUCode(request.body);

        const payload = {
          ...gtpbk.data,
        };

        const token = await reply.jwtSign({ ...payload });

        const response = await Promise.all([
          await model.login(gtpbk.data, token),
          await updateProfileById({
            text: "UPDATE profile SET active_login_at = $2 WHERE user_id = $1",
            id: gtpbk.data.id,
          }),
        ]);

        reply.code(201).send(response[0]);
      } else {
        reply.code(400).send({
          status: "Bad request",
        });
      }
    } catch (error) {
      reply.code(500).send({
        msg: error?.message || "Internal Server Error",
      });
    }
  },
  logout: async (request, reply) => {
    try {
      const response = await model.logout();
      reply.code(201).send(response)
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
