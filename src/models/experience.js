const pool = require("../config/postgre");
const query = require("../db/experience");

module.exports = {
  createExperience: (body) => {
    const { job_title, duration, start_at, finish_at, identity_uuid } = body;
    return new Promise((resolve, reject) => {
      pool.query(
        query.createExperience([
          job_title,
          duration,
          start_at,
          finish_at,
          identity_uuid,
          Date.now(),
        ]),
        (err, _) => {
          if (err) {
            return reject(err);
          }
          return resolve({
            status: "Successful",
            msg: "Successful created",
          });
        }
      );
    });
  },
  getExperience: (q) => {
    const page = q.page || "";
    const results_per_page = q.limit || "";
    const sort_by = q.sort_by || "created_at";
    const order = q.order || "desc";

    const sorting =
      sort_by && order
        ? ` ORDER BY ${sort_by} ${order.toUpperCase()}`
        : ` ORDER BY ${sort_by} ${order.toUpperCase()}`;

    //// Page and Result per page
    const pagination =
      results_per_page && page
        ? ` LIMIT ${+results_per_page} OFFSET ${
            (+page - 1) * +results_per_page
          }`
        : results_per_page
        ? ` LIMIT ${+results_per_page}`
        : "";

    return new Promise((resolve, reject) => {
      pool.query(
        query.getExperience(
          "SELECT id, job_title, duration, description, start_at, finish_at, created_at, updated_at FROM experience" +
            sorting
        ),
        (err, rws) => {
          //// rws = result with sorting
          if (err) {
            return reject(err);
          }

          if (page && results_per_page) {
            pool.query(
              query.getExperience(
                "SELECT id, job_title, duration, description, start_at, finish_at, created_at, updated_at FROM experience" +
                  sorting +
                  pagination
              ),
              (err, rwsp) => {
                //// rwsp = result with sorting pagination
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
  getExperienceById: (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getExperienceById([params.id]), (err, result) => {
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
  updateExperience: (body, params, data) => {
    const values = [
      body.job_title || data.job_title,
      body.duration || data.duration,
      body.start_at || data.start_at,
      body.finish_at || data.finish_at,
      body.identity_uuid || data.identity_uuid,
    ];
    return new Promise((resolve, reject) => {
      pool.query(
        query.updateExperience([params.id, ...values, Date.now()]),
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
  deleteExperience: (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.deleteExperience([params.id]), (err, _) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          status: "Successful",
          msg: "Successful delete",
        });
      });
    });
  },
};
