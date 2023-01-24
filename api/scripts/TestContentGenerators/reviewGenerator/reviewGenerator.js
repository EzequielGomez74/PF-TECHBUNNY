const reviewsTest = require("./reviews.json");
const reviewController = require("../../../apiServices/review/controller");
async function reviewGenerator(user_id, product_id) {
  const pos = Math.floor(Math.random() * reviewsTest.length);
  const review = reviewsTest[pos]; //{description , rating } user_id product_id
  const obj = {
    description: review.description,
    rating: review.rating,
    user_id,
    product_id,
  };
  await reviewController.createReviews(obj);
}
module.exports = reviewGenerator;
