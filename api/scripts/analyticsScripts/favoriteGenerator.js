const favoriteController = require("../../apiServices/favorite/controller");
const favoritesToAdd = require("./favorites.json");
async function favoriteGenerator() {
  console.log(favoritesToAdd);
  await Promise.all(
    favoritesToAdd.map(async (p) => {
      await favoriteController.createFavorite(p);
      return null;
    })
  );
}
module.exports = favoriteGenerator;
