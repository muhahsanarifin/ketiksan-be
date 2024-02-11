const pool = require("../config/postgre");
const query = require("../db/education");

module.exports = {
  createEducation: (body) => {
    const {
      university,
      ipk,
      degree,
      major,
      duration,
      start_at,
      finish_at,
      identity_uuid,
    } = body;
    return new Promise((resolve, reject) => {
      pool.query(
        query.createEducation([
          university,
          ipk,
          degree,
          major,
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
  getEducation: (q) => {
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
        query.getEducation(
          "SELECT id, university, ipk, degree, major, duration, start_at, finish_at, created_at, updated_at FROM education" +
            sorting
        ),
        (err, rws) => {
          //// rws = result with sorting
          if (err) {
            return reject(err);
          }

          if (page && results_per_page) {
            pool.query(
              query.getEducation(
                "SELECT id, university, ipk, degree, major, duration, start_at, finish_at, created_at, updated_at FROM education" +
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
  getEducationById: (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getEducationById([params.id]), (err, result) => {
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
  updateEducation: (body, params, data) => {
    const values = [
      body.university || data.university,
      body.ipk || data.ipk,
      body.degree || data.degree,
      body.major || data.major,
      body.duration || data.duration,
      body.start_at || data.start_at,
      body.finish_at || data.finish_at,
      body.identity_uuid || data.identity_uuid,
    ];

    return new Promise((resolve, reject) => {
      pool.query(
        query.updateEducation([params.id, ...values, Date.now()]),
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
  deleteEducation: (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.deleteEducation([params.id]), (err, _) => {
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
