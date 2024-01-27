module.exports = {
  getProfile: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getProfileById: (values) => {
    return {
      text: "SELECT u.id, u.uuid, u.email, u.username, u.ksvu_code, u.gender, u.job_title, u.current_company, u.role_user, u.status_account, p.created_at, p.updated_at, p.first_login_at, p.last_login_at, p.active_login_at FROM users u LEFT JOIN profile p ON u.id = p.user_id WHERE u.uuid = $1",
      values: values,
    };
  },
  getProfileByEmail: (values) => {
    return {
      text: "SELECT u.id, u.uuid, u.email, u.pass, u.username, u.ksvu_code, u.gender, u.job_title, u.current_company, u.role_user, u.status_account, p.created_at, p.updated_at, p.first_login_at, p.last_login_at, p.active_login_at FROM users u LEFT JOIN profile p ON u.id = p.user_id WHERE u.email = $1",
      values: values,
    };
  },
  // getProfileByKSVUCode: (values) => {
  //   return {
  //     text: "SELECT u.id, u.uuid, u.email, u.username, u.ksvu_code, u.gender, u.job_title, u.current_company, u.role_user, u.status_account, p.created_at, p.updated_at, p.first_login_at, p.last_login_at, p.active_login_at FROM users u LEFT JOIN profile p ON u.id = p.user_id WHERE u.ksvu_code = $1",
  //     values: values,
  //   };
  // },
  getProfileByUsername: (values) => {
    return {
      text: "SELECT * FROM users u WHERE u.username = $1",
      values: values,
    };
  },
  getProfileByEKU: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },

  updateProfileById: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  statusAccount: (values) => {
    return {
      text: "UPDATE user SET status_account = $2, updated_at = $3 WHERE id = $1",
      values: values,
    };
  },
  createProfile: (values) => {
    return {
      text: "INSERT INTO profile (user_id, created_at) VALUES ($1, $2)",
      values: values,
    };
  },
};
