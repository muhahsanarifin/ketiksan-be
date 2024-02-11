const pool = require("../config/postgre");
const query = require("../db/feed");

module.exports = {
  createFeed: (body) => {
    const { description, hastag } = body;
    return new Promise((resolve, reject) => {
      pool.query(
        query.createFeed([description, hastag, Date.now()]),
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
  getFeed: (q) => {
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
        query.getFeed(
          "SELECT id, description, hastag, created_at, updated_at FROM feed" +
            sorting
        ),
        (err, rws) => {
          //// rws = result with sorting
          if (err) {
            return reject(err);
          }

          if (page && results_per_page) {
            pool.query(
              query.getFeed(
                "SELECT id, description, hastag, created_at, updated_at FROM feed" +
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
  getFeedById: (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getFeedById([params.id]), (err, result) => {
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
  updateFeed: (body, params, data) => {
    const values = [
      body.description || data.description,
      hastag || data.hastag,
    ];
    return new Promise((resolve, reject) => {
      pool.query(
        query.updateFeed([params.id, ...values, Date, now()]),
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
  deleteFeed: (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.deleteFeed([params.id]), (err, result) => {
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
