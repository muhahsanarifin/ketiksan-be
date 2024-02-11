module.exports = {
  createInvolvement: (values) => {
    return {
      text: "INSERT INTO involvement (title, duration, university, organitation, start_at, finish_at, identity_uuid, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      values: values,
    };
  },
  getInvolvement: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getInvolvementById: (values) => {
    return {
      text: "SELECT id, title, duration, university, organitation, start_at, finish_at, updated_at, created_at FROM involvement WHERE id",
      values: values,
    };
  },
  updateInvolvement: (values) => {
    return {
      text: "UPDATE involvement SET title = $2, duration = $3, university = $4, organitation = $5, start_at = $6, finish_at = $7, identity_uuid = $8, updated_at = $9 WHERE id = $1",
      values: values,
    };
  },
  deleteInvolvement: (values) => {
    return {
      text: "DELETE FROM involvement WHERE id = $1",
      values: values,
    };
  },
};
