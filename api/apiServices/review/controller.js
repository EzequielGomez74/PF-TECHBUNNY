const { Review } = require("../../services/db/db.js");

async function getAllReviewsBy(condition) {
  try {
    let reviews = await Review.findAll({ where: condition });
    return reviews;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { getAllReviewsBy };
