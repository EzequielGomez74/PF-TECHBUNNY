const { Product, Favorite } = require("../../services/db/db.js");
const {
  productDescriptionParser,
} = require("../../scripts/productDescriptionParser.js");

const {
  productDescriptionToString,
} = require("../../scripts/productDescriptionToString.js");
const getUser = require("../../scripts/getUser");
const axios = require("axios");

async function setFavoriteStatus(products, username) {
  if (products) {
    //traer un array de favoritos correspondiente al user que tiene el access token
    const { user_id } = getUser({ username });
    const favorites = await Favorite.findAll({ where: { user_id } });
    favorites = [...favorites];
    favorites.forEach((fav) => {
      const productFound = products.find(
        (product) => product.product_id === fav
      );
      if (productFound) productFound.favorite = true;
    });
  }
  return products;
}

async function getAllProducts(user_id) {
  try {
    const condition = {
      where: {
        active: true,
      },
      attributes: {
        exclude: ["description", "createdAt", "updatedAt"],
      },
    };
    const products = await Product.findAll(condition);
    return setFavoriteStatus([...products], user_id);
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllProductsBy(condition, user_id) {
  try {
    let products = await Product.findAll({ where: condition });
    products = setFavoriteStatus([...products], user_id);
    return products;
  } catch (error) {
    throw new Error(error);
  }
}

async function getProductById(product_id, user_id) {
  try {
    const product = await Product.findByPk(product_id);
    product = setFavoriteStatus([product], user_id);
    const newObj = { ...product.dataValues };
    newObj.description = productDescriptionParser(newObj.description);
    return newObj;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateProduct(product) {
  delete product.createdAt;
  delete product.updatedAt;
  try {
    await Product.update(
      {
        //buscar forma de destructurar toda la data
        ...product,
        description: productDescriptionToString(product.description),
      },
      {
        where: {
          product_id: product.product_id,
        },
      }
    );
    return "Producto actualizado con exito!";
  } catch (error) {
    throw new Error(error);
  }
}

async function createProduct(product) {
  try {
    await Product.create(
      // create o findorcreate para que no se repita en la base de datos
      {
        ...product,
        description: productDescriptionToString(product.description),
      }
    );
    return "Producto creado con exito!";
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteProduct(product_id) {
  try {
    await Product.update(
      { active: false },
      {
        where: {
          product_id,
        },
      }
    );
    return "Producto deshabilitado con exito!";
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
  getAllProductsBy,
};
