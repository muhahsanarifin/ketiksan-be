const pool = require("../config/postgre");
const query = require("../db/involvement");

module.exports = {
  createInvolvement: (body) => {
    const {
      title,
      duration,
      university,
      organitation,
      start_at,
      finish_at,
      identity_uuid,
    } = body;
    return new Promise((resolve, reject) => {
      pool.query(
        query.createInvolvement([
          title,
          duration,
          university,
          organitation,
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
  getInvolvement: (q) => {
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
        query.getInvolvement(
          "SELECT id, title, duration, university, organitation, start_at, finish_at, created_at, updated_at FROM involvement" +
            sorting
        ),
        (err, rws) => {
          //// rws = result with sorting
          if (err) {
            return reject(err);
          }

          if (page && results_per_page) {
            pool.query(
              query.getInvolvement(
                "SELECT id, title, duration, university, organitation, start_at, finish_at, created_at, updated_at FROM involvement" +
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
  getInvolvementById: (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getInvolvementById([params.id]), (err, result) => {
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
  updateInvolvement: (body, params, data) => {
    const values = [
      body.title || data.title,
      body.duration || data.duration,
      body.university || data.university,
      body.organitation || data.organitation,
      body.start_at || data.start_at,
      body.finish_at || data.finish_at,
      body.identity_uuid || data.identity_uuid,
    ];
    return new Promise((resolve, reject) => {
      pool.query(
        query.updateInvolvement([params.id, ...values, Date.now()]),
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
  deleteInvolvement: (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.deleteInvolvement([params.id]), (err, _) => {
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
