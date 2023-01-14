const {
  Order,
  Product,
  User,
  Category,
  Op,
  OrderProduct,
  Favorite,
  SubCategory,
} = require("../../services/db/db");
const prodController = require("../../apiServices/product/controller");
const favoriteGenerator = require("./favoriteGenerator");

async function createFavoriteCarrousel(user_id) {
  try {
    if (!user_id) user_id = 1;
    //$ testing
    await favoriteGenerator();
    //$ de todos los favoritos del user agarro 10 randoms  (si son menos relleno con null)
    let carrousel = [];
    let favoritesLoaded = await Favorite.findAll({
      where: { user_id },
    });
    favoritesLoaded = await Promise.all(
      favoritesLoaded.map(async (fav) => {
        const product = await Product.findByPk(fav.product_id, { raw: true });
        return {
          product_id: product.product_id,
          subcategory: product.subcategory,
          brand: product.brand,
          selected: false,
        };
      })
    );
    favoritesLoaded = pickRandomfavorites(favoritesLoaded);
    //$ por cada 1 me fijo de su BRAND y de su SUBCATEGORY todos los productos que encuentre sin contar el favorito inicial
    favoritesLoaded.forEach(async (fav) => {
      const mixed = await Product.findAll({
        where: {
          brand: fav.brand,
          subcategory: fav.subcategory,
          product_id: { [Op.ne]: fav.product_id },
        },
        raw: true,
      });
      //$ pickeo uno random en ese array y lo pusheo al carrousel final
      const pos = Math.floor(Math.random() * mixed.length);
      carrousel.push(mixed[pos]);
    });
    //$ los null que restan los completo con un producto aleatorio
    if (carrousel.length < 10) {
      const allProducts = await Product.findAll({ raw: true });
      for (let i = carrousel.length; i < 10; i++) {
        let found = false;
        do {
          const pos = Math.floor(Math.random() * allProducts.length);
          if (
            !carrousel.find((p) => p.product_id === allProducts[pos].product_id)
          ) {
            carrousel.push(allProducts[pos].product_id);
            found = true;
          }
        } while (!found);
      }
    }
    //$ transformacion final
    carrousel = await Promise.all(
      carrousel.map(async (ele) => {
        const productFound = await Product.findByPk(ele.product_id, {
          raw: true,
        });
        return productFound;
      })
    );
    return carrousel;
  } catch (error) {
    throw new Error(error);
  }
}

function pickRandomfavorites(arr) {
  const results = [];
  if (arr.length <= 10) return arr;
  for (let i = 0; i < 10; i++) {
    let found = false;
    do {
      const pos = Math.floor(Math.random() * arr.length);
      if (!arr[pos].selected) {
        results[i] = arr[pos];
        arr[pos].selected = true;
        found = true;
      }
    } while (!found);
  }
  return results;
}

module.exports = createFavoriteCarrousel;
