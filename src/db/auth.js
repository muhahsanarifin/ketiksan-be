module.exports = {
  login: (values) => {
    return {
      text: "INSERT INTO login_history (user_id, token) VALUES ($1, $2) RETURNING *",
      values: values,
    };
  },
  register: (values) => {
    return {
      text: "INSERT INTO users (uuid, email, username, pass, ksvu_code, fullname, job_title, current_company, role_user, status_account) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      values: values,
    };
  },
  getLoginHistoryByUserId: (values) => {
    return {
      text: "SELECT * FROM login_history WHERE user_id = $1",
      values: values,
    };
  },
  logout: (values) => {
    return {
      text: "DELETE FROM login_history where user_id = $1",
      values: values,
    };
  },
  changePassword: (values) => {
    return {
      text: "UPDATE users SET pass = $2 WHERE uuid = $1",
      values: values,
    };
  },
  forgetKsvuCode: (values) => {
    return {
      text: "UPDATE users SET key_reset = $2 WHERE email = $1 RETURNING *",
      values: values,
    };
  },
  resetKsvuCode: (values) => {
    return {
      text: "UPDATE users SET ksvu_code = $3 WHERE email = $1 AND key_reset = $2 RETURNING *",
      values: values,
    };
  },
  resetKey: (values) => {
    return {
      text: "UPDATE users SET key_reset = $3 WHERE email = $1 AND key_reset = $2 RETURNING *",
      values: values,
    };
  },
  verifyResetKey: (values) => {
    return {
      text: "SELECT u.id, u.uuid, u.email, u.key_reset, p.created_at, p.updated_at, p.first_login_at, p.last_login_at, p.active_login_at FROM users u LEFT JOIN profile p ON u.id = p.user_id WHERE u.key_reset = $1",
      values: values,
    };
  },
};
