module.exports = {
  createEducation: (values) => {
    return {
      text: "INSERT INTO education (university, ipk, degree, major, duration, start_at, finish_at,identity_uuid, created_at)",
      values: values,
    };
  },
  getEducation: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getEducationById: (values) => {
    return {
      text: "SELECT id, university, ipk, degree, major, duration, start_at, finish_at, created_at, updated_at FROM education WHERE id = $1",
      values: values,
    };
  },
  updateEducation: (values) => {
    return {
      text: "UPDATE education SET university = $2, ipk = $3, degree = $4, major = $5, duration = $6, start_at = $7, finish_at = $8, identity_uuid = $9, updated_at = $10 WHERE id = $1",
      values: values,
    };
  },
  deleteEducation: (values) => {
    return {
      text: "DELETE FROM educaton WHERE id = $1",
      values: values,
    };
  },
};
