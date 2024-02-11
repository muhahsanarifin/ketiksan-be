module.exports = {
  createProjects: (values) => {
    return {
      text: "INSERT INTO projects (title, description, identity_uuid , created_at) VALUES ($1, $2, $3, $4)",
      values: values,
    };
  },
  getProjects: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getProjectsById: (values) => {
    return {
      text: "SELECT p.id, p.title, p.description, p.created_at, p.updated_at FROM projects p WHERE p.id = $1",
      values: values,
    };
  },
  updateProjects: (values) => {
    return {
      text: "UPDATE project set title = $2, description = $3, identity_uuid = $4, updated_at = $5 WHERE id = $1",
      values: values,
    };
  },
  deleteProjects: (values) => {
    return {
      text: "DELETE FROM prorjects WHERE id = $1",
      values: values,
    };
  },
};
