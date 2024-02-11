module.exports = {
  createCourseWork: (values) => {
    return {
      text: "INSERT INTO coursework (title, course_place, duration, syllabus, description, start_at, finish_at, identity_uuid, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      values: values,
    };
  },
  getCourseWork: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getCourseWorkById: (values) => {
    return {
      text: "SELECT id, title, course_place, duration, syllabus,description, start_at, finish_at FROM coursework WHERE id = $1",
      values: values,
    };
  },
  updateCourseWork: (values) => {
    return {
      text: "UPDATE coursework SET title = $2, course_place = $3, duration = $4, syllabus = $5, description = $6, start_at = $7, finish_at = $8, identity_uuid = $9, updated_at = $10 WHERE id = $1",
      values: values,
    };
  },
  deleteCourseWork: (values) => {
    return {
      text: "DELETE FROM coursework WHERE id = $1",
      values: values,
    };
  },
};
