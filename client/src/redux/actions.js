import axiosInstance from "./axiosInstance.js";
import {
  GET_ALL_PRODUCTS,
  GET_CATEGORIES,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
  ORDER_BY_PRICE,
  ADD_FAVORITE,
  ADD_CART,
  REMOVE_CART,
  REMOVE_FAVORITE,
} from "./actionTypes";

//ORIGINAL DE FRONT > DESCOMENTAR
// export const getProducts = () => {
//   return function (dispatch) {
//     return fetch("http://localhost:3001/products")
//       .then((resp) => resp.json())
//       .then((data) => dispatch({ type: GET_ALL_PRODUCTS, payload: data }))
//       .catch((error) => console.log(error));
//   };
// };

//TESTEO DE LOGIN < COMENTAR
export const getProducts = (id) => {
  return async function (dispatch) {
    try {
      const response = await axiosInstance.get("/products");
      console.log(response.data);
      return dispatch({ type: GET_ALL_PRODUCTS, payload: response.data });
    } catch (error) {
      console.log("FAILED TO AUTHENTICATE");
    }
  };
};

export const getProductById = (id) => {
  return function (dispatch) {
    return fetch(`http://localhost:3001/products/${id}`)
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: GET_PRODUCT_BY_ID, payload: data }))
      .catch((error) => console.log(error));
  };
};

export const getCategories = () => {
  return function (dispatch) {
    return fetch("http://localhost:3001/categories")
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: GET_CATEGORIES, payload: data }))
      .catch((error) => console.log(error));
  };
};

export const getProductsByCategory = (category) => {
  return function (dispatch) {
    // let Capitalize = category[0].toUpperCase() + category.slice(1)
    return fetch(`http://localhost:3001/products?category=${category}`)
      .then((resp) => resp.json())
      .then((data) =>
        dispatch({ type: GET_PRODUCTS_BY_CATEGORY, payload: data })
      )
      .catch((error) => console.log(error));
  };
};

export const filterByBrand = (products, brand) => {
  return function (dispatch) {
    const filteredByBrand = products.filter((p) => p.brand === brand);
    dispatch({ type: FILTER_BY_BRAND, payload: filteredByBrand });
  };
};
