module.exports = {
  createIdentity: (values) => {
    return {
      text: "INSERT INTO identity (uuid, fullname, address, email, no_telp, linkedin_link, website_link, other_link, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      values: values,
    };
  },
  getIdentity: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getIdentityById: (values) => {
    return {
      text: "SELECT uuid, fullname, address, email, no_telp, linkedin_link, website_link, other_link, picture, created_at, updated_at FROM identity WHERE uuid = $1",
      values: values,
    };
  },
  updateIdentity: (values) => {
    return {
      text: "UPDATE identity SET fullname = $2, address = $3, email = $4, no_telp = $5, linkedin_link = $6, website_link = $7, other_link = $8, created_at = $9 WHERE uuid = $1",
      values: values,
    };
  },
  updateIdentityPicture: (values) => {
    return {
      text: "UPDATE identity SET picture = $2, updated_at = $3 WHERE uuid = $1",
      values: values,
    };
  },
  deleteIdentity: (values) => {
    return {
      text: "DELETE FROM identity WHERE uuid = $1",
      values: values,
    };
  },
};
