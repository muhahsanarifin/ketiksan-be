module.exports = {
  fastifyMailer: ({ from, service, user, pass }) => {
    return {
      defaults: {
        from: from,
      },
      transport: {
        service: service,
        auth: {
          user: user,
          pass: pass,
        },
      },
    };
  },
};
