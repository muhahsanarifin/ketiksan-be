module.exports = {
  createFeed: (values) => {
    return {
      text: "INSERT INTO feed (description, hastag, created_at) VALUES ($1, $2, $3)",
      values: values,
    };
  },
  getFeed: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getFeedById: (values) => {
    return {
      text: "SELECT id, description, hastag, created_at, updated_at FROM feed WHERE id = $1",
      values: values,
    };
  },
  updateFeed: (values) => {
    return {
      text: "UPDATE feed SET description = $2, hastag = $3, updated_at = $4 WHERE id = $1",
      values: values,
    };
  },
  deleteFeed: (values) => {
    return {
      text: "DELETE FROM feed where id = $1",
      values: values,
    };
  },
};
