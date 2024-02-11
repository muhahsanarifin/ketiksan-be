const pool = require("../config/postgre");
const query = require("../db/skills");

module.exports = {
  createSkills: (body) => {
    const { technical_skilss, industry_knowledge } = body;
    return new Promise((resolve, reject) => {
      pool.query(
        query.createSkills([technical_skilss, industry_knowledge, Date.now()]),
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
  getSkills: (q) => {
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
        query.getExperience(
          "SELECT s.id, s.technical_skilss, s.industry_knowledge, s.created_at, s.updated_at FROM skills s" +
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
                "SELECT s.id, s.technical_skilss, s.industry_knowledge, s.created_at, s.updated_at FROM skills s" +
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
  getSkillsById: (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getSkillsById([params.id]), (err, result) => {
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
  updateSkills: (body, params, data) => {
    const values = [
      body.technical_skilss || data.technical_skilss,
      body.industry_knowledge || data.industry_knowledge,
      Date.now(),
    ];
    return new Promise((_, reject) => {
      pool.query(
        query.updateSkills([params.id, ...values, Date.now()]),
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
  deleteSkills: (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.deleteSkills([params.id]), (err, _) => {
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
