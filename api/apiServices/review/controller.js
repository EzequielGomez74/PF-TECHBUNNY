const { Review, Product } = require("../../services/db/db.js");
const getUser = require("../../scripts/getUser");

async function updateProductRating(product_id) {
  const productReviews = await getAllReviewsBy({ product_id });
  const total = productReviews.reduce((prev, rev) => prev + rev.rating, 0);
  Product.update(
    { rating: Math.floor(total / productReviews.length) },
    { where: { product_id } }
  );
}

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
    await updateProductRating(review.product_id);
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
