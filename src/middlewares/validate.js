const {
  getProfileByEmail,
  getProfileByUsername,
  getProfileByEKU,
} = require("../models/user");
const random = require("../helpers/random");
const value = require("../helpers/value");

module.exports = {
  body: async (request, reply, allowedKeys) => {
    if (!request.body || Object.keys(request.body).length === 0) {
      reply.code(400).send({
        status: "Bad request",
        msg: "Request body is missing",
      });
    }

    if (allowedKeys.length !== 0) {
      const sanitizedKey = Object.keys(request.body).filter((key) =>
        allowedKeys.includes(key)
      );

      const newBody = {};
      for (let key of sanitizedKey) {
        Object.assign(newBody, {
          [key]:
            typeof request.body[key] === "string"
              ? request.body[key].trim()
              : request.body[key],
        });
      }

      request.body = newBody;
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

    const gpbEKU = await getProfileByEKU({
      ...query,
    });

    if (gpbEKU.data.length === 0) {
      reply.code(400).send({
        status: "Bad Request",
        msg: `${random.maskedString(
          request.body.ksvu_code || request.body.email || request.body.username
        )} is not registered`,
      });
    }

    if (request.query.with === "email" || request.query.with === "username") {
      const match = await value.compare(
        request,
        request.body.pass,
        gpbEKU.data[0].pass
      );
      if (!match) {
        reply.code(400).send({
          status: "Bad Request",
          msg: "Wrong Password",
        });
      }
    }

    //// Another approach
    // if (loginWith === "email") {
    //   const gtpbe = await getProfileByEmail(request.body);

    //   if (gtpbe.data.length === 0) {
    //     reply.code(400).send({
    //       status: "Bad Request",
    //       msg: `${random.maskedString(request.body.email)} is not registered`,
    //     });
    //   }
    //   const match = await value.compare(
    //     request,
    //     request.body.pass,
    //     gtpbe.data[0].pass
    //   );
    //   if (!match) {
    //     reply.code(400).send({
    //       status: "Bad Request",
    //       msg: "Wrong Password",
    //     });
    //   }
    // }

    // if (loginWith === "username") {
    //   const gtpbu = await getProfileByUsername(request.body);

    //   if (gtpbu.data.length === 0) {
    //     reply.code(400).send({
    //       status: "Bad Request",
    //       msg: `${random.maskedString(
    //         request.body.username
    //       )} is not registered`,
    //     });
    //   }
    //   const match = await value.compare(
    //     request,
    //     request.body.pass,
    //     gtpbu.data[0].pass
    //   );
    //   if (!match) {
    //     reply.code(400).send({
    //       status: "Bad Request",
    //       msg: "Wrong Password",
    //     });
    //   }
    // }

    // if (loginWith === "ksvu_code") {
    //   const gtpbk = await getProfileByKSVUCode(request.body);
    //   if (gtpbk.data.length === 0) {
    //     reply.code(400).send({
    //       status: "Bad Request",
    //       msg: `${random.maskedString(
    //         request.body.ksvu_code
    //       )} is not registered`,
    //     });
    //   }
    // }
  },
};
