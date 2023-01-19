const { Product, Review } = require("../../../services/db/db.js");
const reviewsTest = require("./reviews.json");
const reviewController = require("../../../apiServices/review/controller");
async function reviewGenerator() {
  let maxProducts = await Product.findAll();
  maxProducts = maxProducts.length;
  for (let i = 0; i < 3000; i++) {
    const pos = Math.floor(Math.random() * reviewsTest.length);
    const product_id = Math.floor(Math.random() * maxProducts + 1);
    const review = reviewsTest[pos]; //{description , rating } user_id product_id
    const obj = {
      description: review.description,
      rating: review.rating,
      user_id: Math.floor(Math.random() * 84 + 9),
      product_id,
    };
    await reviewController.createReviews(obj);
  }
  console.log("REVIEWS LOADED");
}
module.exports = reviewGenerator;
