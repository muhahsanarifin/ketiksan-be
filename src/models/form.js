const pool = require("../config/postgre");
const random = require("../helpers/random");
const query = require("../db/form");

module.exports = {
  //// Biodata
  createBio: async (body) => {
    const { email, username, gender, job_title, current_company, role_user } =
      body;

    return new Promise((resolve, reject) => {
      pool.query(
        query.createBio([
          random.uuid(),
          email,
          username,
          random.ksvucode(),
          gender,
          job_title,
          current_company,
          role_user || 3,
          1,
        ]),
        (err, result) => {
          if (err) {
            return reject(err);
          }

          pool.query(
            query.createProfile([result.rows[0].id, Date.now()]),
            (err, _) => {
              if (err) {
                return reject(err);
              }

              return resolve({
                status: "Successful",
                msg: "Successful Created",
                data: {
                  ksvu_code: result.rows[0].ksvu_code,
                  gender: result.rows[0].gender,
                },
              });
            }
          );
        }
      );
    });
  },

  deleteBioById: async (params) => {
    return new Promise((resolve, reject) => {
      pool.query(
        query.deleteBioById(
          "DELETE FROM profile WHERE user_id = $1 RETURNING *",
          [params.id]
        ),
        (err, result) => {
          if (err) {
            return reject(err);
          }
          pool.query(
            query.deleteBioById("DELETE FROM users WHERE id = $1 ", [
              result.rows[0].id,
            ]),
            (err,
            (_) => {
              if (err) {
                return reject(err);
              }
              return resolve({
                status: "Successful",
                msg: "Successful Delete",
              });
            })
          );
        }
      );
    });
  },

  //// Invitation
  createInvitation: async (body, payload) => {
    const { inviter, company, notes, inviting_url } = body;
    return new Promise((resolve, reject) => {
      pool.query(
        query.createInvitation([
          payload.uuid,
          inviter,
          company,
          notes,
          inviting_url,
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
  getInvitation: async (q) => {
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
        query.getInvitation("SELECT * FROM invitation" + sorting),
        (err, rws) => {
          //// rws = result with sorting
          if (err) {
            return reject(err);
          }

          if (page && results_per_page) {
            pool.query(
              query.getInvitation(
                "SELECT * FROM invitation" + sorting + pagination
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
  getInvitationById: async (params) => {
    return new Promise((resolve, reject) => {
      pool.query(
        query.getInvitationById([params.id], (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve({
            status: "Successful",
            msg: "Successful get data",
            data: result.rows[0],
          });
        })
      );
    });
  },
  deleteInvitationById: async (params) => {
    return new Promise((resolve, reject) => {
      pool.query(query.deleteInvitationById([params.id]), (err, _) => {
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
