/**
 * TODO: Login, Forgot, Reset, Change are able to use ksvu_code or email & password
 */

const pool = require("../config/postgre");
const query = require("../db/auth");

module.exports = {
  login: async (data, token) => {
    return new Promise((resolve, reject) => {
      pool.query(query.login([data.id, token]), (err, result) => {
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
  logout: async () => {
    return new Promise((resolve, reject) => {
      pool.query(query.logout(), (err, _) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          status: "Successful",
          msg: "Successful logout",
        });
      });
    });
  },
  forget: async () => {
    return new Promise((resolve, reject) => {
      pool.query(query.forgetKSVUCode(), (err, result) => {
        if (err) {
          return reject(err);
        }
      });
    });
  },
  reset: async (query) => {
    return new Promise((resolve, reject) => {
      pool.query(query.resetKSVUCode(), (err, result) => {
        if (err) {
          return reject(err);
        }
      });
    });
  },
  change: async () => {
    return new Promise((resolve, reject) => {
      pool.query(query.changeKSVUCode(), (err, result) => {
        if (err) {
          return reject(err);
        }
      });
    });
  },
};
