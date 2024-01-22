module.exports = {
  login: (values) => {
    return {
      text: "INSERT INTO login_history (user_id, token) VALUES ($1, $2) RETURNING *",
      values: values,
    };
  },
  register: (values) => {
    return {
      text: "INSERT INTO users (uuid, email, username, pass, ksvu_code, gender, job_title, current_company, role_user, status_account) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
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
  forget: (values) => {
    return {
      text: "",
      values: values,
    };
  },
  reset: (values) => {
    return {
      text: "",
      values: values,
    };
  },
  change: (values) => {
    return {
      text: "",
      values: values,
    };
  },
};
