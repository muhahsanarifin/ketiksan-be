const pool = require("../config/postgre");
const query = require("../db/portofolio");
const value = require("../helpers/value");

module.exports = {
  createPortofolio: async (body) => {
    const {
      title,
      description,
      url_resource,
      url_deploy,
      tech_used,
      category_portofolio_id,
    } = body;
    return new Promise((resolve, reject) => {
      pool.query(
        query.createPortofolio([
          title,
          description,
          url_resource,
          url_deploy,
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
        ? ` LIMIT ${+results_per_page}`
        : "";

    return new Promise((resolve, reject) => {
      pool.query(
        query.getPortofolio(
          "SELECT p.id, p.title, p.description, p.url_resource, p.tech_used , p.category_portofolio_id, cp.category AS category_portofolio, p.url_deploy , p.created_at, p.updated_at FROM portofolio p LEFT JOIN category_portofolio cp ON category_portofolio_id  = cp.id" +
            sorting
        ),
        (err, rws) => {
          //// rws = result with sorting
          if (err) {
            return reject(err);
          }

          if (page && results_per_page) {
            pool.query(
              query.getPortofolio(
                "SELECT p.id, p.title, p.description, p.url_resource, p.tech_used , p.category_portofolio_id, cp.category AS category_portofolio, p.url_deploy , p.created_at, p.updated_at FROM portofolio p LEFT JOIN category_portofolio cp ON category_portofolio_id  = cp.id" +
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
                  data: value.data({ data: rwsp.rows }),
                  meta: { ...meta },
                });
              }
            );
          } else {
            return resolve({
              status: "Successful",
              msg: "Successful get data",
              data: value.data({ data: rws.rows }),
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
  getTitlePortofolio: async (body) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getTitlePortofolio([body.title]), (err, result) => {
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
  updatePortofolio: async (body, params, data) => {
    //// First approach
    // const {
    //   title,
    //   description,
    //   url_resource,
    //   tech_used,
    //   url_deploy,
    //   category_portofolio_id,
    // } = body;

    // body.title = value.default(title, data.title);
    // body.description = value.default(description, data.description);
    // body.url_resource = value.default(url_resource, data.url_resource);
    // body.url_deploy = value.default(url_deploy, data.url_deploy);
    // body.tech_used = value.default(tech_used, data.tech_used);
    // body.category_portofolio_id = value.default(
    //   category_portofolio_id,
    //   data.category_portofolio_id
    // );

    //// Second approach
    const values = [
      body.title || data.title,
      body.description || data.description,
      body.url_resource || data.url_resource,
      body.url_deploy || data.url_deploy,
      body.tech_used || data.tech_used,
      body.category_portofolio_id || data.category_portofolio_id,
    ];

    return new Promise((resolve, reject) => {
      pool.query(
        query.updatePortofolio([+params.id, ...values, Date.now()]),
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
      pool.query(query.deletePortofolioById([params.id]), (err, _) => {
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
