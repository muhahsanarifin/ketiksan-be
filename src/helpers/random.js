const { v4: uuidv4 } = require("uuid");
const randomstring = require("randomstring");

module.exports = {
  uuid: () => {
    return uuidv4();
  },
  ksvucode: () => {
    return randomstring.generate({
      length: 6,
      charset: "alphanumeric",
    });
  },
};
