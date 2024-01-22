/**
 * TODO: Login, Forgot, Reset, Change are able to use ksvu_code or email & password
 */

const pool = require("../config/postgre");
const random = require("../helpers/random");
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
  register: async (body, hash) => {
    const { email, username, gender, job_title, current_company, role_user } =
      body;
    return new Promise((resolve, reject) => {
      pool.query(
        query.register([
          random.uuid(),
          email,
          username,
          hash,
          random.ksvucode(),
          gender,
          job_title || "",
          current_company || "",
          role_user || 3,
          1,
        ]),
        (err, _) => {
          if (err) {
            return reject(err);
          }
          return resolve({
            status: "Successful",
            msg: "Successful registered",
          });
        }
      );
    });
  },
  getLoginHistoryByUserId: async (payload) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getLoginHistoryByUserId([payload.id]), (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          status: "Successful",
          msg: "Successful get data",
          data: result.rows,
        });
      });
    });
  },
  logout: async (payload) => {
    return new Promise((resolve, reject) => {
      pool.query(query.logout([payload.id]), (err, _) => {
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
