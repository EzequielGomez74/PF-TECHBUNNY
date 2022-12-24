const {
  Product,
  Category,
  SubCategory,
  Brand,
} = require("../../services/db/db.js");
const {
  productDescriptionParser,
} = require("../../scripts/productDescriptionParser.js");

const {
  productDescriptionToString,
} = require("../../scripts/productDescriptionToString.js");

const axios = require("axios");

async function getAllProducts() {
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
    return products;
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllProductsBy(condition) {
  try {
    let products = await Product.findAll({ where: condition });
    return products;
  } catch (error) {
    throw new Error(error);
  }
}

async function getProductById(product_id) {
  try {
    const product = await Product.findByPk(product_id);
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
  console.log(product);
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
