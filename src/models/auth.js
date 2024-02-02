/**
 * TODO: Login, Forgot, Reset, Change are able to use ksvu_code or email & password
 */

const pool = require("../config/postgre");
const query = require("../db/auth");
const { createProfile } = require("../db/user");
const random = require("../helpers/random");

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
    const { email, username, fullname, job_title, current_company, role_user } =
      body;
    return new Promise((resolve, reject) => {
      pool.query(
        query.register([
          random.uuid(),
          email,
          username,
          hash,
          random.ksvucode(),
          fullname,
          job_title || "",
          current_company || "",
          role_user || 3,
          1,
        ]),
        (err, result) => {
          if (err) {
            return reject(err);
          }

          pool.query(
            createProfile([result.rows[0].id, Date.now()]),
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

  changePassword: async (data, hash) => {
    return new Promise((resolve, reject) => {
      pool.query(query.changePassword([data.uuid, hash]), (err, _) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          status: "Successful",
          msg: "Successful change password",
        });
      });
    });
  },

  forgetKsvuCode: async (body) => {
    return new Promise((resolve, reject) => {
      pool.query(
        query.forgetKsvuCode([body.email, random.key()]),
        (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve({
            status: "Successful",
            msg: "Successful updated",
            data: result.rows[0],
          });
        }
      );
    });
  },

  resetKsvuCode: async (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        query.resetKsvuCode([data.email, data.key_reset, random.ksvucode()]),
        (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve({
            status: "Successful",
            msg: `Successful reset KSVU Code. Please, check via ${random.maskedString(
              data.email
            )}`,
            data: result.rows[0],
          });
        }
      );
    });
  },

  //// Reset key
  resetKey: async (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        query.resetKey([data.email, data.key_reset, ""]),
        (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve({
            status: "Successful",
            msg: "Successful reset key reset code",
            data: result.rows[0],
          });
        }
      );
    });
  },

  verifyResetKey: async (body) => {
    return new Promise((resolve, reject) => {
      pool.query(query.verifyResetKey([body.key_reset]), (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          status: "Successful",
          msg: "Successful verify reset key",
          data: result.rows,
        });
      });
    });
  },
};
