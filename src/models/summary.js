const pool = require("../config/postgre");
const query = require("../db/summary");

module.exports = {
  createSummary: (body) => {
    const { description } = body;
    return new Promise((resolve, reject) => {
      pool.query(query.createSummary([description, Date.now()]), (err, _) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          status: "Successful",
          msg: "Successful Created",
        });
      });
    });
  },
  getSummary: (q) => {
    const page = q.page || "";
    const results_per_page = q.limit || "";
    const sort_by = q.sort_by || "s.created_at";
    const order = q.order || "desc";

    const sorting =
      sort_by && order
        ? ` ORDER BY s.${sort_by} ${order.toUpperCase()}`
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
        query.getSummary(
          "SELECT s.id, s.identity_uuid, s.description, s.created_at, s.updated_at FROM summary s" +
            sorting
        ),
        (err, rws) => {
          //// rws = result with sorting
          if (err) {
            return reject(err);
          }

          if (page && results_per_page) {
            pool.query(
              query.getSummary(
                "SELECT s.id, s.identity_uuid, s.description, s.created_at, s.updated_at FROM summary s" +
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
  getSummaryById: (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getSummaryById([params.id]), (err, result) => {
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
  updateSummary: (body, params, data) => {
    const values = [
      body.description,
      body.identity_uuid || data.identity_uuid || data.description,
    ];
    return new Promise((resolve, reject) => {
      pool.query(
        query.updateSummary([params.id, ...values, Date.now()]),
        (err, _) => {
          if (err) {
            return reject(err);
          }
          return resolve({
            status: "Successful",
            msg: "Successful Updated",
          });
        }
      );
    });
  },
  deleteSummary: (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.deleteSummary([params.identity_uuid]), (err, _) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          status: "Successful",
          msg: "Successful Delete",
        });
      });
    });
  },
};
