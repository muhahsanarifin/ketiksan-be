module.exports = {
  access: async (request, reply) => {
    //const bearerToken = request?.headers?.authorization;
    //console.log("Bearer token: ", bearerToken.split(" ")[1]);

    try {
      //// jwtVeryfy() & jwtDecode() can be used to decode token.
      const decodedToken = await request.jwtVerify();
      // console.log("Result decoded token :", decodedToken);

      request.payload = decodedToken;

      // const decodedToken = await request.jwtDecode(bearerToken.split(" ")[1]);
      // console.log("Result decoded token :", decodedToken);
    } catch (error) {
      reply.send(error);
    }
  },
};
