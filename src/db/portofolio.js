module.exports = {
  createPortofolio: (values) => {
    return {
      text: "INSERT INTO portofolio (title, description, url, resource, tech_used, category_portofolio_id, crated_at) VALUES ($1, $2, $3, $4, $5, $6. $7)",
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
  updatePortofolio: (values) => {
    return {
      text: "UPDATE SET title = $2, description = $3, url_resource = $4, tech_used = $5, category_portofolio_id = $6, updated_at = $7 WHERE id = $1",
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
