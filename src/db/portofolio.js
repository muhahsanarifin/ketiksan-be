module.exports = {
  createPortofolio: (values) => {
    return {
      text: "INSERT INTO portofolio (title, description, url_resource, url_deploy, tech_used, category_portofolio_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      values: values,
    };
  },
  getPortofolio: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getPortofolioById: (values) => {
    return {
      text: "SELECT * FROM portofolio WHERE id = $1",
      values: values,
    };
  },
  getTitlePortofolio: (values) => {
    return {
      text: "SELECT title FROM portofolio WHERE title = $1",
      values: values,
    };
  },
  updatePortofolio: (values) => {
    return {
      text: "UPDATE portofolio SET title = $2, description = $3, url_resource = $4, url_deploy = $5, tech_used = $6, category_portofolio_id = $7, updated_at = $8 WHERE id = $1",
      values: values,
    };
  },
  deletePortofolioById: (values) => {
    return {
      text: "DELETE FROM portofolio WHERE id = $1",
      values: values,
    };
  },
};
