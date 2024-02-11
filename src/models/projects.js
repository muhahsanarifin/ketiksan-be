const pool = require("../config/postgre");
const query = require("../db/projects");

module.exports = {
  createProjects: (body) => {
    const { title, description, identity_uuid } = body;
    return new Promise((resolve, reject) => {
      pool.query(
        query.createProjects([title, description, identity_uuid, Date.now()]),
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
  getProjects: (q) => {
    const page = q.page || "";
    const results_per_page = q.limit || "";
    const sort_by = q.sort_by || "p.created_at";
    const order = q.order || "desc";

    const sorting =
      sort_by && order
        ? ` ORDER BY p.${sort_by} ${order.toUpperCase()}`
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
        query.getProjects(
          "SELECT p.id, p.title, p.description, p.created_at, p.updated_at FROM projects p" +
            sorting
        ),
        (err, rws) => {
          //// rws = result with sorting
          if (err) {
            return reject(err);
          }

          if (page && results_per_page) {
            pool.query(
              query.getProjects(
                "SELECT p.id, p.title, p.description, p.created_at, p.updated_at FROM projects p" +
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
  getProjectsById: (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getProjectsById([params.id]), (err, result) => {
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
  updateProjects: (body, params, data) => {
    const values = [
      body.title || data.title,
      body.description || data.description,
      body.identity_uuid || data.identity_uuid,
    ];
    return new Promise((resolve, reject) => {
      pool.query(
        query.updateProjects([params.id, ...values, Date.now()]),
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
  deleteProjects: (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.deleteProjects([params.id]), (err, _) => {
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
