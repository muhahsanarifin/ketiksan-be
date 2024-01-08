const pool = require("../config/postgre");
const query = require("../db/user");

module.exports = {
  getProfile: async (q) => {
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
        query.getProfile(
          "SELECT u.id, u.uuid, u.email, u.username, u.ksvu_code, u.gender, u.job_title, u.current_company, u.role_user, u.status_account, p.created_at, p.updated_at, p.first_login_at, p.last_login_at, p.active_login_at FROM users u LEFT JOIN profile p ON u.id = p.user_id" +
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
              query.getProfile(
                "SELECT u.id, u.uuid, u.email, u.username, u.ksvu_code, u.gender, u.job_title, u.current_company, u.role_user, u.status_account, p.created_at, p.updated_at, p.first_login_at, p.last_login_at, p.active_login_at FROM users u LEFT JOIN profile p ON u.id = p.user_id" +
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
  getProfileById: async (payload) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getProfileById([payload.uuid]), (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          status: "Successful",
          msg: "Successful get data",
          data: result.rows[0],
        });
      });
    });
  },
  getProfileByKSVUCode: async (body) => {
    return new Promise((resolve, reject) => {
      pool.query(
        query.getProfileByKSVUCode([body.ksvu_code]),
        (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve({
            status: "Successful",
            msg: "Successful get data",
            data: result.rows[0],
          });
        }
      );
    });
  },
  //// Approach with params.id || payload.uuid || id
  updateProfileById: async ({ text, params = "", payload = "", id = "" }) => {
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
  statusAccount: async (body) => {
    return new Promise((resolve, reject) => {
      pool.query(
        query.statusAccount([body.status_account, Date.now()]),
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
