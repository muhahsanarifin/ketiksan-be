const pool = require("../config/postgre");
const query = require("../db/auth");

module.exports = {
  //// Visitor
  loginByVisitor: async (data, token) => {
    return new Promise((resolve, reject) => {
      pool.query(query.loginByVisitor([data.id, token]), (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          status: "Successful",
          msg: "Successful login",
          data: {
            token: result.rows[0].token,
          },
        });
      });
    });
  },
  forgetKSVUCode: async () => {
    return new Promise((resolve, reject) => {
      pool.query(query.forgetKSVUCode(), (err, result) => {
        if (err) {
          return reject(err);
        }
      });
    });
  },
  resetKSVUCode: async (query) => {
    return new Promise((resolve, reject) => {
      pool.query(query.resetKSVUCode(), (err, result) => {
        if (err) {
          return reject(err);
        }
      });
    });
  },
  changeKSVUCode: async () => {
    return new Promise((resolve, reject) => {
      pool.query(query.changeKSVUCode(), (err, result) => {
        if (err) {
          return reject(err);
        }
      });
    });
  },

  //// Admin
  loginByAdmin: async () => {
    return new Promise((resolve, reject) => {
      pool.query(query.loginByAdmin(), (err, result) => {
        if (err) {
          reject(err);
        }
      });
    });
  },
  changePasswordByAdmin: async (data) => {
    return new Promise((resolve, reject) => {
      pool.query(query.changePasswordByAdmin(), (err, result) => {
        if (err) {
          reject(err);
        }
      });
    });
  },
};
