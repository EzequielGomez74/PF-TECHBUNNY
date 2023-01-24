const createFavoriteCarrousel = require("../../scripts/analyticsScripts/createFavoriteCarrousel");
const createOrderCarrousel = require("../../scripts/analyticsScripts/createOrderCarrousel");
const { User } = require("../../services/db/db.js");

async function getCarrousel(carrouselType, username) {
  let user_id;
  if (username) {
    const foundUser = await User.findOne({ where: { username } });
    user_id = foundUser.user_id;
  } else {
    user_id = 1;
  }
  let results;
  if (carrouselType === "favorites") {
    results = await createFavoriteCarrousel(user_id);
  } else {
    results = await createOrderCarrousel(user_id);
  }
  return results;
}

module.exports = { getCarrousel };
