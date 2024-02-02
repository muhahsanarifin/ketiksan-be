module.exports = {
  //// Bio
  createBio: (values) => {
    return {
      text: "INSERT INTO users (uuid, email, username, fullname, ksvu_code, job_title, current_company, role_user, status_account) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      values: values,
    };
  },
  deleteBioById: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  //// Invitation
  createInvitation: (values) => {
    return {
      text: "INSERT INTO invitation (uuid_user, inviter, company, notes, inviting_url, created_at) VALUES ($1, $2, $3, $4, $5, $6)",
      values: values,
    };
  },
  getInvitation: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getInvitationById: (values) => {
    return {
      text: "SELECT * FROM invitation WHERE id = $1",
      values: values,
    };
  },
  deleteInvitationById: (values) => {
    return {
      text: "DELETE FROM invitation WHERE id = $1",
      values: values,
    };
  },
};
