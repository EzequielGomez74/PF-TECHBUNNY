const { Product, Favorite, Brand } = require("../../services/db/db.js");
const {
  productDescriptionParser,
} = require("../../scripts/productDescriptionParser.js");

const {
  productDescriptionToString,
} = require("../../scripts/productDescriptionToString.js");

const getUser = require("../../scripts/getUser");
const axios = require("axios");
const cloudinary = require("../../services/cloudinary/index");

async function setFavoriteStatus(products, username) {
  try {
    if (!username) return products;
    const newProducts = [...products];
    if (newProducts) {
      //traer un array de favoritos correspondiente al user que tiene el access token
      const { user_id } = await getUser({ username });
      let favorites = await Favorite.findAll({ where: { user_id }, raw: true });
      favorites.forEach((fav) => {
        const productFound = newProducts.find(
          (product) => product.product_id === fav.product_id
        );
        if (productFound) {
          productFound.dataValues.favorite = true;
        }
      });
    }
    return newProducts;
  } catch (error) {
    throw new Error(error);
  }
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
    condition.active = true;
    let products = await Product.findAll({
      where: condition,
    });
    return await setFavoriteStatus(products, username);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getProductById(product_id, username) {
  try {
    let product = await Product.findByPk(product_id, {
      where: { active: true },
    });
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
    await Brand.findOrCreate({ where: { name: product.brand } });
    await Product.create(
      // create o findorcreate para que no se repita en la base de datos
      {
        ...product,
        description: product.description,
      }
    );
    return "Producto creado con exito!";
  } catch (error) {
    throw new Error({ error: error.message });
  }
}

async function deleteProduct(product_id) {
  try {
    const existe = await Product.findOne({ where: { product_id } });
    if (existe.active === false) {
      await Product.update(
        { active: true },
        {
          where: {
            product_id,
          },
        }
      );
      return "Producto habilitado con exito!";
    }
    if (existe.active === true) {
      await Product.update(
        { active: false },
        {
          where: {
            product_id,
          },
        }
      );
    }

    return "Producto deshabilitado con exito!";
  } catch (error) {
    throw new Error(error);
  }
}

function uploadImage(body, file) {
  return new Promise((resolve, reject) => {
    try {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "techbunny", format: "png" },
        function (error, result) {
          if (error) {
            reject(new Error(error.message));
          }
          body = {
            ...body,
            price: parseInt(body.price),
            stock: parseInt(body.stock),
            image: result.url,
          };
          resolve(body);
        }
      );
      stream.end(file.buffer);
    } catch (error) {
      reject(new Error({ error: error.message }));
    }
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
  getAllProductsBy,
  setFavoriteStatus,
  uploadImage,
};
