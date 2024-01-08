const pool = require("../config/postgre");
const query = require("../db/portofolio");

module.exports = {
  createPortofolio: async (body) => {
    const {
      title,
      description,
      url_resource,
      tech_used,
      category_portofolio_id,
    } = body;
    return new Promise((resolve, reject) => {
      pool.query(
        query.createPortofolio([
          title,
          description,
          url_resource,
          tech_used,
          category_portofolio_id,
          Date.now(),
        ]),
        (err, _) => {
          if (err) {
            return reject(err);
          }
          resolve({
            status: "Successful",
            msg: "Successful Created",
          });
        }
      );
    });
  },
  getPortofolio: async (q) => {
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
        ? limit
        : "";

    return new Promise((resolve, reject) => {
      pool.query(
        query.getPortofolio("SELECT * FROM portofolio" + sorting),
        (err, rws) => {
          //// rws = result with sorting
          if (err) {
            return reject(err);
          }

          if (page && results_per_page) {
            pool.query(
              query.getPortofolio(
                "SELECT * FROM portofolio" + sorting + pagination
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
              data: result.rows,
            });
          }
        }
      );
    });
  },
  getPortofolioById: async (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getPortofolioById([params.id]), (err, result) => {
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
  updatePortofolio: async (body, params, data) => {
    //// First approach
    // const {
    //   title,
    //   description,
    //   url_resource,
    //   tech_used,
    //   category_portofolio_id,
    // } = body;

    // body.title = value.default(title, data.title);
    // body.description = value.default(description, data.description);
    // body.url_resource = value.default(url_resource, data.url_resource);
    // body.tech_used = value.default(tech_used, data.tech_used);
    // body.category_portofolio_id = value.default(
    //   category_portofolio_id,
    //   data.category_portofolio_id
    // );

    //// Second approach
    const values = {
      title: body.title || data.title,
      description: body.description || data.description,
      url_resource: body.url_resource || data.url_resource,
      tech_used: body.tech_used || data.tech_used,
      category_portofolio_id:
        body.category_portofolio_id || data.category_portofolio_id,
    };

    return new Promise((resolve, reject) => {
      pool.query(
        query.updatePortofolio([
          params.id,
          ...Object.values(values),
          Date.now(),
        ]),
        (err, _) => {
          if (err) {
            return reject(err);
          }
          resolve({
            status: "Successful",
            msg: "Successful updated",
          });
        }
      );
    });
  },
  deletePortofolioById: async (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.deletePortofolioById([params.id]), (err, result) => {
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
