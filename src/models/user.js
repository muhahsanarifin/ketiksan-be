const pool = require("../config/postgre");
const query = require("../db/user");
const random = require("../helpers/random");

module.exports = {
  getUser: async (q) => {
    const page = q.page || "";
    const results_per_page = q.limit || "";
    const sort_by = q.sort_by || "created_at";
    const order = q.order || "desc";

    const sorting =
      sort_by && order
        ? ` ORDER BY ${sort_by} ${order.toUpperCase()}`
        : ` ORDER BY ${sort_by} ${order.toUpperCase()}`;

    //// Result per page
    const limit = ` LIMIT ${+results_per_page}`;

    //// Page and Result per page
    const pagination =
      results_per_page && page
        ? ` LIMIT ${+results_per_page} OFFSET ${
            (+page - 1) * +results_per_page
          }`
        : results_per_page
        ? limit
        : "";

    return new Promise((resolve, reject) => {
      pool.query(
        query.getUser(
          "SELECT u.id, u.uuid, u.email, u.username, u.fullname, u.ksvu_code, u.job_title, u.current_company, u.role_user, u.status_account, p.created_at, p.updated_at, p.first_login_at, p.last_login_at, p.active_login_at FROM users u LEFT JOIN profile p ON u.id = p.user_id" +
            sorting
        ),
        (err, rws) => {
          //// rws = result with sorting
          if (err) {
            return reject(err);
          }

          //// If value page and limit query does exist.
          if (+page && +results_per_page) {
            pool.query(
              query.getUser(
                "SELECT u.id, u.uuid, u.email, u.username, u.fullname, u.ksvu_code, u.job_title, u.current_company, u.role_user, u.status_account, p.created_at, p.updated_at, p.first_login_at, p.last_login_at, p.active_login_at FROM users u LEFT JOIN profile p ON u.id = p.user_id" +
                  sorting +
                  pagination
              ),
              (err, rwsp) => {
                //// rwsp = result with sorting and pagination
                if (err) {
                  return reject(err);
                }
                const meta = {
                  page: +page,
                  limit: +results_per_page,
                  totalPage: Math.ceil(rws?.rowCount / +results_per_page),
                  totalData: rws?.rowCount,
                };

                return resolve({
                  status: "Successful",
                  msg: "Successful get data",
                  data: rwsp.rows,
                  meta: { ...meta },
                });
              }
            );
          } else {
            //// If value page and limit query does note exist.
            return resolve({
              status: "Successful",
              msg: "Successful get data",
              data: rws.rows,
            });
          }
        }
      );
    });
  },
  getUserById: async (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getProfileById([params.id]), (err, result) => {
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
  getProfileById: async (payload) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getProfileById([payload.uuid]), (err, result) => {
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
  getProfileByEmail: async (body) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getProfileByEmail([body.email]), (err, result) => {
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
  getProfileByUsername: async (body) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getProfileByUsername([body.username]), (err, result) => {
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
  getProfileByEKU: async ({ text, values }) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getProfileByEKU(text, [values]), (err, result) => {
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
  getPasswordById: async (data) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getPasswordById([data.uuid]), (err, result) => {
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
  updateProfileById: async ({ body, payload, data }) => {
    const values = [
      body.fullname || data.fullname,
      body.job_title || data.job_title,
      body.current_company || data.current_company,
    ];
    return new Promise((resolve, reject) => {
      pool.query(
        query.updateProfileById("UPDATE users SET fullname = $2, job_title = $3, current_company = $4 WHERE uuid = $1", [payload.uuid, ...values]),
        (err, _) => {
          if (err) {
            return reject(err);
          }
          return resolve({
            status: "Successful",
            msg: "Successful updated",
          });
        }
      );
    });
  },
  //// Approach with params.id || payload.uuid || id
  updateDateProfileById: async ({ text, params = "", payload = "", id = "" }) => {
    return new Promise((resolve, reject) => {
      pool.query(
        query.updateProfileById(text, [
          params.id || payload.uuid || id,
          Date.now(),
        ]),
        (err, _) => {
          if (err) {
            return reject(err);
          }
          return resolve({
            status: "Successful",
            msg: "Successful updated",
          });
        }
      );
    });
  },
  statusAccount: async (body, payload) => {
    return new Promise((resolve, reject) => {
      pool.query(
        query.statusAccount([payload.id, body.status_account, Date.now()]),
        (err, _) => {
          if (err) {
            return reject(err);
          }
          resolve({
            status: "Sucsessful",
            msg: "Successful update",
          });
        }
      );
    });
  },
};
