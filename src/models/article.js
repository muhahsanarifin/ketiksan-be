const pool = require("../config/postgre");
const query = require("../db/article");

module.exports = {
  createArticle: async (body) => {
    const { title, description, author, category_article_id } = body;
    return new Promise((resolve, reject) => {
      pool.query(
        query.createArticle([
          title,
          description,
          author,
          category_article_id,
          Date.now(),
        ]),
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
  getArticle: async (q) => {
    const page = q.page || "";
    const results_per_page = q.limi || "";
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
        query.getArticle("SELECT * FROM article" + sorting),
        (err, rws) => {
          //// rws = result with sorting
          if (err) {
            return reject(err);
          }

          if (page && results_per_page) {
            pool.query(
              query.getArticle("SELECT * FROM article" + sorting + pagination),
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
  getArticleById: async (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getArticleById([params.id]), (err, result) => {
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
  updateArticle: async (body, params, data) => {
    const values = {
      title: body.title || data.title,
      description: body.description || data.description,
      category_article_id: body.category_article_id || data.category_article_id,
    };
    return new Promise((resolve, reject) => {
      pool.query(
        query.updateArticle([params.id, ...Object.values(values), Date.now()]),
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
  deleteArticleById: async (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.deleteArticleById([params.id]), (err, _) => {
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
