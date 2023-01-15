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
  if (!username) return products;
  if (products) {
    //traer un array de favoritos correspondiente al user que tiene el access token
    const { user_id } = await getUser({ username });
    let favorites = await Favorite.findAll({ where: { user_id }, raw: true });
    favorites.forEach((fav) => {
      const productFound = products.find(
        (product) => product.product_id === fav.product_id
      );
      if (productFound) {
        productFound.dataValues.favorite = true;
      }
    });
  }
  return products;
}

async function getAllProducts(username) {
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
    return await setFavoriteStatus([...products], username);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllProductsBy(condition, username) {
  try {
    let products = await Product.findAll({ where: condition });
    return await setFavoriteStatus(products, username);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getProductById(product_id, username) {
  try {
    let product = await Product.findByPk(product_id);
    let arr = [product];
    let newProduct = await setFavoriteStatus(arr, username);
    const newObj = { ...newProduct[0].dataValues };
    newObj.description = productDescriptionParser(newObj.description);
    return newObj;
  } catch (error) {
    throw new Error(error.message);
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
        description: product.description,
      },
      {
        where: {
          product_id: product.product_id,
        },
      }
    );
    return "Producto actualizado con exito!";
  } catch (error) {
    throw new Error(error.message);
  }
}

async function createProduct(product) {
  try {
    await Product.create(
      // create o findorcreate para que no se repita en la base de datos
      {
        ...product,
        description: product.description,
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