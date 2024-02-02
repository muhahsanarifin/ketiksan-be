/**
 * TODO: Login, Forgot, Reset, Change are able to use ksvu_code or email & password
 */

const model = require("../models/auth");
const { updateDateProfileById, getProfileByEKU } = require("../models/user");
const value = require("../helpers/value");
const random = require("../helpers/random");

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
        "SELECT u.id, u.uuid, u.email, u.username, u.fullname, u.ksvu_code, u.job_title, u.current_company, u.role_user, u.status_account, p.created_at, p.updated_at, p.first_login_at, p.last_login_at, p.active_login_at FROM users u LEFT JOIN profile p ON u.id = p.user_id WHERE " +
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
        await updateDateProfileById({
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
      //     await updateDateProfileById({
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
      //     await updateDateProfileById({
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
      //     await updateDateProfileById({
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
        await updateDateProfileById({
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

  changePassword: async (request, reply) => {
    try {
      //// Hash new pass
      const hash = await value.hash(request, request.body.new_pass);

      const response = await model.changePassword(request.payload, hash);

      reply.code(201).send(response);
    } catch (error) {
      reply.code(500).send({
        status: "Server Error",
        msg: error?.message || "Internal Server Error",
      });
    }
  },

  forgetKsvuCode: async (request, reply) => {
    try {
      const response = await model.forgetKsvuCode(request.body);

      request.resetKsvuCodeData = response;

      reply.code(201).send({
        status: response.status,
        msg: `Successful sent to ${random.maskedString(request.body.email)}.`,
      });
    } catch (error) {
      reply.code(500).send({
        msg: error?.message || "Internal Server Error",
      });
    }
  },

  resetKsvuCode: async (request, reply) => {
    try {
      const response = await Promise.all([
        await model.resetKsvuCode(request.verifyResponseData),
        await model.resetKey(request.verifyResponseData),
      ]);

      request.updateKsvuCodeData = {
        email: response[0].data.email,
        fullname: response[0].data.fullname,
        ksvu_code: response[0].data.ksvu_code,
      };

      reply
        .code(201)
        .send({ status: response[0].status, msg: response[0].msg });
    } catch (error) {
      reply.code(500).send({
        msg: error?.message || "Internal Server Error",
      });
    }
  },
};
