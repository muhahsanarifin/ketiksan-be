module.exports = {
  body: async (request, reply) => {
    if (!request.body || Object.keys(request.body).length === 0) {
      reply.code(400).send({
        status: "Bad request",
        msg: "Request body is missing",
      });
    }
    if (
      !Object.keys(request.body).includes("username", "password") &&
      !Object.keys(request.body).includes("ksvu_code")
    ) {
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
  // params: async (request, reply) => {

  // }
};
