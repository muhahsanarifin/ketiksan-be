const { getLoginHistoryByUserId } = require("../models/auth");
const value = require("../helpers/value");

module.exports = {
  access: async (request, reply) => {
    try {
      const decodedToken = await request.jwtVerify();

      const response = await getLoginHistoryByUserId(decodedToken);

      if (response.data.length === 0) {
        reply
          .code(403)
          .send({ status: "Forbidden", msg: "You have to login first!" });
      }

      request.payload = decodedToken;
    } catch (error) {
      reply.send({
        code: error.code,
        name: error.name,
        status: error.statusCode,
        msg: error.message,
      });
    }
  },
  allowedByRoles: async (allowedByRoles, request, reply) => {
    const { role_user } = request.payload;

    const hasAllowedRoles = allowedByRoles.includes(value.role(role_user));

    if (!hasAllowedRoles) {
      reply.code(403).send({
        status: "Forbidden",
        msg: "Access denied",
      });
    }
  },
};
