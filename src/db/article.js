module.exports = {
  createArticle: (values) => {
    return {
      text: "INSERT INTO article (title, description, author, category_article_id, created_at) VALUES ($1, $2, $3, $4, $5)",
      values: values,
    };
  },
  getArticle: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getArticleById: (values) => {
    return {
      text: "SELECT * FROM article WHERE id = $1",
      values: values,
    };
  },
  getTitleArticle: (values) => {
    return {
      text: "SELECT title FROM article WHERE title = $1",
      values: values,
    };
  },
  updateArticle: (values) => {
    return {
      text: "UPDATE article SET title = $2, description = $3, author = $4, category_article_id = $5, updated_at = $6 WHERE id = $1",
      values: values,
    };
  },
  deleteArticleById: (values) => {
    return {
      text: "DELETE FROM article WHERE id = $1",
      values: values,
    };
  },
};
