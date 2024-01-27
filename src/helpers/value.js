module.exports = {
  default: (value, exist) => {
    return value.length !== 0 ? value : exist;
  },
  hash: async (request, pass) => {
    const hash = await request.bcryptHash(pass);
    return hash;
  },
  compare: async (request, pass, hash) => {
    const match = await request.bcryptCompare(pass, hash);
    return match;
  },
  //// 1 = admin, 2 = recruiter, 3 = guest
  role: (id) => {
    if (+id === 1) {
      return "admin";
    }
    if (+id === 2) {
      return "recruiter";
    }
    if (+id === 3) {
      return "guest";
    }
  },
  gender: (id) => {
    if (+id) {
      return "Mr";
    }
    if (+id) {
      return "Ms";
    }
    if (+id) {
      return "Miss";
    }
  },
  data: ({ data }) => {
    const stringToArray = (str) => {
      return str.trim().replaceAll(",", "").split(" ");
    };

    return data.map((val) => {
      return {
        ...val,
        url_resource: stringToArray(val.url_resource),
      };
    });
  },
};
