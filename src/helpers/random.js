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
  maskedString: (str) => {
    let output = "",
      sLastIdx = str.includes("@") ? str.indexOf("@") - 2 : str.length - 2;
    Array.from(str).forEach((value, idx) => {
      if (idx > 0 && idx <= sLastIdx) {
        value = "*";
      }
      output += value;
    });
    return output;
  },
  key: () => {
    return randomstring.generate({
      length: 4,
      charset: "numeric",
    });
  },
};
