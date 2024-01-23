module.exports = {
  getCategoryArticle: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getCategoryArticleById: (values) => {
    return {
      text: "SELECT * FROM category_article WHERE id = $1",
      values: values,
    };
  },
  createCategoryArticle: (values) => {
    return {
      text: "INSERT INTO category_article (category, created_at) VALUES ($1, $2) RETURNING *",
      values: values,
    };
  },
  deleteCategoryArticle: (values) => {
    return {
      text: "DELETE FROM category_article WHERE id",
      values: values,
    };
  },
  updateCategoryArticle: (values) => {
    return {
      text: "UPDATE category_article SET category = $2, updated_at = $3 WHERE id = $1",
      values: values,
    };
  },
  getCategoryPortofolio: (text, values) => {
    return {
      text: text,
      values: values,
    };
  },
  getCategoryPortofolioById: (values) => {
    return {
      text: "SELECT * FROM category_portofolio WHERE id = $1",
      values: values,
    };
  },
  createCategoryPortofolio: (values) => {
    return {
      text: "INSERT INTO category_portofolio (category, created_at) VALUES ($1, $2) RETURNING *",
      values: values,
    };
  },
  deleteCategoryPortofolio: (values) => {
    return {
      text: "DELETE FROM category_portofolio WHERE id",
      values: values,
    };
  },
  updateCategoryPortofolio: (values) => {
    return {
      text: "UPDATE category_portofolio SET category = $2, updated_at = $3 WHERE id = $1",
      values: values,
    };
  },
};
