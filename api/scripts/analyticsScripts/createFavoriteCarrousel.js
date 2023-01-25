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
    //if (!user_id) user_id = 1;
    //$ testing
    //await favoriteGenerator();
    //$ de todos los favoritos del user agarro 10 randoms  (si son menos relleno con null)
    let carrousel = [];
    let favoritesLoaded = await Favorite.findAll({
      where: { user_id },
    });

    favoritesLoaded = await Promise.all(
      favoritesLoaded.map(async (fav) => {
        const product = await Product.findByPk(fav.product_id, {
          where: { active: true },
          raw: true,
        });
        return {
          product_id: product.product_id,
          subcategory: product.subcategory,
          brand: product.brand,
          selected: false,
        };
      })
    );
    favoritesLoaded = pickRandomfavorites(favoritesLoaded);
    const favoritesBackUp = [...favoritesLoaded];
    //$ por cada 1 me fijo de su BRAND y de su SUBCATEGORY todos los productos que encuentre sin contar el favorito inicial
    favoritesLoaded.forEach(async (fav) => {
      const mixed = await Product.findAll({
        where: {
          brand: fav.brand,
          subcategory: fav.subcategory,
          product_id: { [Op.ne]: fav.product_id },
          active: true,
        },
        raw: true,
      });
      //$ pickeo uno random en ese array y lo pusheo al carrousel final
      if (mixed.length > 0) {
        const pos = Math.floor(Math.random() * mixed.length);
        carrousel.push(mixed[pos]);
      }
    });
    //$ los null que restan los completo con un producto aleatorio
    if (carrousel.length < 10) {
      const allProducts = await Product.findAll({
        where: { active: true },
        raw: true,
      });
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
          where: { active: true },
          raw: true,
        });
        return productFound;
      })
    );
    //TODO arreglar los favoritos con id repetido
    carrousel = checkDuplicates(favoritesBackUp, carrousel);
    const products = await Product.findAll({
      where: { active: true },
      raw: true,
    });
    for (let i = 0; i < carrousel.length; i++) {
      if (carrousel[i] === null) {
        const pos = Math.floor(Math.random() * products.length);
        carrousel[i] = products[pos];
      }
    }
    return carrousel;
  } catch (error) {
    throw new Error(error);
  }
}

function checkDuplicates(arrBackUp, arrOrigi) {
  for (let i = 0; i < arrOrigi.length; i++) {
    if (arrBackUp.find((pb) => pb?.product_id === arrOrigi[i]?.product_id)) {
      arrOrigi[i] = null;
    }
  }
  return arrOrigi;
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
