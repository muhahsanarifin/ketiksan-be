module.exports = {
  login: (values) => {
    return {
      text: "INSERT INTO login_history (user_id, token) VALUES ($1, $2) RETURNING *",
      values: values,
    };
  },
  logout: (values) => {
    return {
      text: "",
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
