const pinoPretty = {
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "HH:MM:ss Z",
      ignore: "pid,hostname",
    },
  },
  production: true,
};

module.exports = pinoPretty;
