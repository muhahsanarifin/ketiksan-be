module.exports = {
  createSkills: (values) => {
    return {
      text: "INSERT INTO skills (technical_skilss, industry_knowledge, created_at) VALUES ($1, $2, $3)",
      values: values,
    };
  },
  getSkills: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getSkillsById: (values) => {
    return {
      text: "SELECT s.id, s.technical_skilss, s.industry_knowledge, s.created_at, s.updated_at FROM skills s WHERE s.id = $1",
      values: values,
    };
  },
  updateSkills: (values) => {
    return {
      text: "UPDATE skills SET technical_skills = $2, industry_knowledge = $3, updated_at = $4 WHERE id = $1",
      values: values,
    };
  },
  deleteSkills: (values) => {
    return {
      text: "DELETE FROM skill WHERE id = $1",
      values: values,
    };
  },
};
