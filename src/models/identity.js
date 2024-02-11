const pool = require("../config/postgre");
const query = require("../db/identity");
const random = require("../helpers/random");

module.exports = {
  createIdentity: (body) => {
    const {
      fullname,
      address,
      email,
      no_telp,
      linkedin_link,
      website_link,
      other_link,
    } = body;
    return new Promise((resolve, reject) => {
      pool.query(
        query.createIdentity([
          random.uuid(),
          fullname,
          address,
          email,
          no_telp,
          linkedin_link,
          website_link,
          other_link,
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
  getIdentity: (q) => {
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
        query.getIdentity(
          "SELECT uuid, fullname, address, email, no_telp, linkedin_link, website_link, other_link, picture, created_at, updated_at FROM identity" +
            sorting
        ),
        (err, rws) => {
          //// rws = result with sorting
          if (err) {
            return reject(err);
          }

          if (page && results_per_page) {
            pool.query(
              query.getIdentity(
                "SELECT uuid, fullname, address, email, no_telp, linkedin_link, website_link, other_link, picture, created_at, updated_at FROM identity" +
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
  getIdentityById: (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.getIdentityById([params.id]), (err, result) => {
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
  updateIdentity: ({ body, params, data }) => {
    const values = [
      body.fullname || data.fullname,
      body.address || data.address,
      body.email || data.email,
      body.no_telp || data.no_telp,
      body.linkedin_link || data.linkedin_link,
      body.website_link || data.website_link,
      body.other_link || data.other_link,
    ];
    return new Promise((resolve, reject) => {
      pool.query(
        query.updateIdentity([params.id, ...values, Date.now()]),
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
  updateIdentityPicture: (params, picture) => {
    return new Promise((resolve, reject) => {
      pool.query(query.updateIdentityPicture([params.id, picture.secure_url, Date.now()]), (err, _) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          status: "Successful",
          msg: "Successful updated",
        });
      });
    });
  },
  deleteIdentity: (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.deleteIdentity([params.id]), (err, _) => {
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
