/**
 * TODO: Login, Forgot, Reset, Change are able to use ksvu_code or email & password
 */

const model = require("../models/auth");
const {
  getProfileByKSVUCode,
  updateProfileById,
  getProfileByEmail,
  getProfileByUsername,
  getProfileByEKU,
} = require("../models/user");
const value = require("../helpers/value");

module.exports = {
  login: async (request, reply) => {
    const loginWith =
      request.query.with === "ksvu_code"
        ? "u.ksvu_code"
        : request.query.with === "email"
        ? "u.email"
        : request.query.with === "username"
        ? "u.username"
        : "u.ksvu_code";

    const query = {
      text:
        "SELECT u.id, u.uuid, u.email, u.pass, u.username, u.ksvu_code, u.gender, u.job_title, u.current_company, u.role_user, u.status_account, p.created_at, p.updated_at, p.first_login_at, p.last_login_at, p.active_login_at FROM users u LEFT JOIN profile p ON u.id = p.user_id WHERE " +
        loginWith +
        " = $1",
      values:
        request.body.ksvu_code || request.body.email || request.body.username,
    };

    try {
      const gpbEKU = await getProfileByEKU({ ...query });

      const payload = {
        ...gpbEKU.data[0],
      };
      const token = await reply.jwtSign({ ...payload });
      const response = await Promise.all([
        await model.login(gpbEKU.data[0], token),
        await updateProfileById({
          text: "UPDATE profile SET active_login_at = $2 WHERE user_id = $1",
          id: gpbEKU.data[0].id,
        }),
      ]);
      reply.code(201).send(response[0]);

      //// Another approach
      // if (loginWith === "email") {
      //   //// gtpbe = Get profile by email
      //   const gtpbe = await getProfileByEmail(request.body);
      //   const payload = {
      //     ...gtpbe.data[0],
      //   };
      //   const token = await reply.jwtSign({ ...payload });
      //   const response = await Promise.all([
      //     await model.login(gtpbe.data[0], token),
      //     await updateProfileById({
      //       text: "UPDATE profile SET active_login_at = $2 WHERE user_id = $1",
      //       id: gtpbe.data[0].id,
      //     }),
      //   ]);
      //   reply.code(201).send(response[0]);
      // }

      // if (loginWith === "username") {
      //   //// gtpbu = Get profile by username
      //   const gtpbu = await getProfileByUsername(request.body);
      //   const payload = {
      //     ...gtpbu.data[0],
      //   };
      //   const token = await reply.jwtSign({ ...payload });
      //   const response = await Promise.all([
      //     await model.login(gtpbu.data[0], token),
      //     await updateProfileById({
      //       text: "UPDATE profile SET active_login_at = $2 WHERE user_id = $1",
      //       id: gtpbu.data[0].id,
      //     }),
      //   ]);
      //   reply.code(201).send(response[0]);
      // }

      // if (loginWith === "ksvu_code") {
      //   //// gtpbk = Get profile by KSVUCode
      //   const gtpbk = await getProfileByKSVUCode(request.body);
      //   const payload = {
      //     ...gtpbk.data[0],
      //   };
      //   const token = await reply.jwtSign({ ...payload });
      //   const response = await Promise.all([
      //     await model.login(gtpbk.data[0], token),
      //     await updateProfileById({
      //       text: "UPDATE profile SET active_login_at = $2 WHERE user_id = $1",
      //       id: gtpbk.data[0].id,
      //     }),
      //   ]);
      //   reply.code(201).send(response[0]);
      // }
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
      const response = await Promise.all([
        await model.logout(request.payload),
        await updateProfileById({
          text: "UPDATE profile SET last_login_at = $2 WHERE user_id = $1",
          id: request.payload.id,
        }),
      ]);
      reply.code(201).send(response[0]);
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
