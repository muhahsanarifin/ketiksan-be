module.exports = {
  createSummary: (values) => {
    return {
      text: "INSERT INTO summary (identity_uuid, description, created_at)",
      values: values,
    };
  },
  getSummary: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getSummaryById: (values) => {
    return {
      text: "SELECT s.id, s.identity_uuid, s.description, s.created_at, s.updated_at FROM summary s WHERE id = $1",
      values: values,
    };
  },
  updateSummary: (values) => {
    return {
      text: "UPDATE summary SET description = $2, identity_uuid = $3, updated_at = $4 WHERE id = $1",
      values: values,
    };
  },
  deleteSummary: (values) => {
    return {
      text: "DELETE FROM summary WHERE identity_uuid = $1",
      values: values,
    };
  },
};
