const favoriteController = require("../../../apiServices/favorite/controller");
const favoritesToAdd = require("./favorites.json");

async function favoriteTestGenerator() {
  //{"user_id":2,"product_id":397}
  for (let j = 0; j < 250; j++) {
    for (let i = 1; i <= 5; i++) {
      const obj = {
        product_id: Math.floor(Math.random() * 830) + 1,
        user_id: Math.floor(Math.random() * 83) + 10,
      };
      await favoriteController.createFavorite(obj);
    }
  }
}
module.exports = favoriteTestGenerator;
