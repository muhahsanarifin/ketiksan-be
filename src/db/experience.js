module.exports = {
  createExperience: (values) => {
    return {
      text: "INSERT INTO experience (job_title, duration, start_at, finish_at, identity_uuid, created_at) VALUES ($1, $2, $3, $4, $5, $6)",
      values: values,
    };
  },
  getExperience: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getExperienceById: (values) => {
    return {
      text: "SELECT id, job_title, duration, description, start_at, finish_at, created_at, updated_at FROM experience WHERE id = $1",
      values: values,
    };
  },
  updateExperience: (values) => {
    return {
      text: "UPDATE experience SET job_title = $2, duration = $3, start_at = $4, finish_at = $5, identity_uuid = $6, updated_at = $7 WHERE id = $1",
      values: values,
    };
  },
  deleteExperience: (values) => {
    return {
      text: "DELETE FROM experience WHERE id = $1",
      values: values,
    };
  },
};
