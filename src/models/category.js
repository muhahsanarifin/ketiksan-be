const pool = require("../config/postgre");
const query = require("../db/category");

module.exports = {
  getCategoryArticle: async (q) => {
    const page = q.page || "";
    const results_per_page = q.limit || "";

    //// Pagination
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
        query.getCategoryArticle("SELECT * FROM category_article"),
        (err, result) => {
          //// result without pagination
          if (err) {
            return reject(err);
          }

          if (+page && +results_per_page) {
            pool.query(
              query.getCategoryArticle(
                "SELECT * FROM category_article" + pagination
              ),
              (err,
              (rwp) => {
                //// result with pagination
                if (err) {
                  return reject(err);
                }

                const meta = {
                  page: +page,
                  limit: +results_per_page,
                  totalPage: Math.ceil(result?.rowCount / +results_per_page),
                  totalData: result?.rowCount,
                };

                return resolve({
                  status: "Successful",
                  msg: "Successful get data",
                  data: rwp?.rows,
                  meta: { ...meta },
                });
              })
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
  getCategoryArticleById: async (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getCategoryArticleById([params.id]), (err, result) => {
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
  createCategoryArtcile: async (body) => {
    return new Promise((resolve, reject) => {
      const { category } = body;
      pool.query(
        query.createCategoryArticle([category, Date.now()]),
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
  deleteCategoryArticle: async (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.deleteCategoryArticle([params.id]), (err, _) => {
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
  updateCategoryArticle: async (body, params, data) => {
    const values = {
      category: body.category || data.category,
    };
    return new Promise((resolve, reject) => {
      pool.query(
        query.updateCategoryArticle([
          params.id,
          ...Object.values(values),
          Date.now(),
        ]),
        (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve({
            status: "Successful",
            msg: "Successful updated",
            data: result.rows,
          });
        }
      );
    });
  },
  getCategoryPortofolio: async (q) => {
    const page = q.page || "";
    const results_per_page = q.limit || "";

    //// Pagination
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
        query.getCategoryPortofolio("SELECT * FROM category_portofolio"),
        (err, result) => {
          //// result withou pagination
          if (err) {
            return reject(err);
          }

          if (+page && +results_per_page) {
            pool.query(
              query.getCategoryPortofolio(
                "SELECT * FROM category_portofolio" + pagination
              ),
              (err, rwp) => {
                //// result with pagination
                if (err) {
                  return reject(err);
                }

                const meta = {
                  page: +page,
                  limit: +results_per_page,
                  totalPage: Math.ceil(result?.rowCount / +results_per_page),
                  totalData: result?.rowCount,
                };

                return resolve({
                  status: "Successful",
                  msg: "Successful get data",
                  data: rwp?.rows,
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
  getCategoryPortofolioById: async (params) => {
    return new Promise((resolve, reject) => {
      pool.query(
        query.getCategoryPortofolioById([params.id]),
        (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve({
            status: "Successful",
            msg: "Successful updated",
            data: result.rows,
          });
        }
      );
    });
  },
  createCategoryPortofolio: async (body) => {
    const { category } = body;
    return new Promise((resolve, reject) => {
      pool.query(
        query.createCategoryPortofolio([category, Date.now()]),
        (err, _) => {
          if (err) {
            return reject(err);
          }
          return resolve({
            status: "Successful",
            msg: "Successful Created",
          });
        }
      );
    });
  },
  deleteCategoryPortofolio: async (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.deleteCategoryPortofolio([params.id]), (err, _) => {
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
  updateCategoryPortofolio: async (body, params, data) => {
    const values = {
      category: body.category || data.category,
    };
    return new Promise((resolve, reject) => {
      pool.query(
        query.updateCategoryPortofolio([
          params.id,
          ...Object.values(values),
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
};
