const { Review } = require("../../services/db/db.js");
const getUser = require("../../scripts/getUser");

async function getAllReviewsBy(condition) {
  try {
    let reviews = await Review.findAll({ where: condition });
    reviews = await Promise.all(
      reviews.map(async (review) => {
        const { username } = await getUser({
          user_id: review.dataValues.user_id,
        });
        delete review.dataValues.user_id;
        return {
          ...review.dataValues,
          username,
        };
      })
    );
    return reviews;
  } catch (error) {
    throw new Error(error);
  }
}

async function createReviews(review) {
  try {
    await Review.create(review);
    return "Reseña creada con exito!";
  } catch (error) {
    throw new Error(error);
  }
}

async function updateReviews(review) {
  try {
    await Review.update(review, { where: { review_id: review.review_id } });
    return "Reseña modificada con exito!";
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteReviews(review_id) {
  try {
    await Review.destroy({ where: { review_id } });
    return "Reseña eliminada con exito!";
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getAllReviewsBy,
  createReviews,
  updateReviews,
  deleteReviews,
};
