// import store from "./store";
import axiosInstance from "./axiosInstance";
// import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  GET_CATEGORIES,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS_BY_CATEGORY,
  FILTER_BY_BRAND,
  SORT_BY_PRICE,
  ADD_FAVORITE,
  ADD_CART,
  REMOVE_CART,
  REMOVE_FAVORITE,
  TOGGLE_DARK_MODE,
  GET_SEARCH_RESULTS,
  GET_REVIEWS_BY,
  SET_LOGGED_USER,
  CLEAN_DETAIL,
  CLEAN_CATEGORY_PRODUCTS,
} from "./actionTypes";

export const getProducts = (id) => {
  return async function (dispatch) {
    try {
      const response = await axiosInstance.get("/products");
      console.log("Mostrando productos");
      return dispatch({ type: GET_ALL_PRODUCTS, payload: response.data });
    } catch (error) {
      console.log("FAILED TO AUTHENTICATE");
    }
  };
};

// export function getProducts() {
//   return async function (dispatch) {
//     try {
//       var json = await axios.get("http://localhost:3001/products");
//       return dispatch({ type: GET_ALL_PRODUCTS, payload: json.data });
//     } catch (error) {
//       alert(error);
//     }
//   };
// }

export function getProductById(id) {
  return async function (dispatch) {
    try {
      console.log("#");
      var json = await axiosInstance.get(`/products/${id}`);
      return dispatch({ type: GET_PRODUCT_BY_ID, payload: json.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}
export const getReviewsBy = (productId, userId) => {
  return async function (dispatch) {
    try {
      const response = await axiosInstance.get(
        `/reviews?product_id=${productId}`
      );
      return dispatch({ type: GET_REVIEWS_BY, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postReview = (review, onSuccess) => {
  return async function () {
    try {
      console.log("review", review);
      const postedReview = await axiosInstance.post("/reviews", review);
      onSuccess();
      return postedReview;
    } catch (error) {
      console.log(error);
    }
  };
};

export function getCategories() {
  return async function (dispatch) {
    try {
      var json = await axiosInstance.get("/categories");
      return dispatch({ type: GET_CATEGORIES, payload: json.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getProductsByCategory(category) {
  return async function (dispatch) {
    try {
      console.log(category);
      let json = await axiosInstance.get(`/products?category=${category}`);
      console.log("1");
      return dispatch({ type: GET_PRODUCTS_BY_CATEGORY, payload: json.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const filterByBrand = (brand) => {
  return { type: FILTER_BY_BRAND, payload: brand };
};

export const sortByPrice = (priceOrder) => {
  return { type: SORT_BY_PRICE, payload: priceOrder };
};

// export const filterByBrand = (products, brand) => {
//   return function (dispatch) {
//     const filteredByBrand = products.filter((p) => p.brand === brand);
//     dispatch({ type: FILTER_BY_BRAND, payload: filteredByBrand });
//   };
// };

// export const filterByPrice = (products, max, min) => {
//   return function (dispatch) {
//     const filteredByPrice = products.filter(
//       (p) => p.price < max && p.price > min
//     );
//     dispatch({ type: FILTER_BY_PRICE, payload: filteredByPrice });
//   };
// };

export function toggleDarkMode() {
  return { type: TOGGLE_DARK_MODE };
}

// export const filterByPrice = (products, max, min) => {
//     return function(dispatch){
//         const filteredByPrice = products.filter((p) => p.price < max && p.price > min)
//         dispatch({type: FILTER_BY_PRICE, payload: filteredByPrice})
//     }
// }

// export const orderByPrice = (products, order) => {
//   return function (dispatch) {
//     if (order === "asc") {
//       const asc = products.sort((a, b) => {
//         if (a.price < b.price) return -1;
//         if (a.price > b.price) return 1;
//         else return 0;
//       });
//       dispatch({ type: ORDER_BY_PRICE, payload: [...asc] });
//     }
//     if (order === "desc") {
//       const desc = products.sort((a, b) => {
//         if (a.price > b.price) return -1;
//         if (a.price < b.price) return 1;
//         else return 0;
//       });
//       dispatch({ type: ORDER_BY_PRICE, payload: [...desc] });
//     }
//   };
// };

export const addFavorite = (payload) => {
  return {
    type: ADD_FAVORITE,
    payload,
  };
};

export const removeFavorite = (id) => {
  return {
    type: REMOVE_FAVORITE,
    payload: id,
  };
};

export const addCart = (payload) => {
  return {
    type: ADD_CART,
    payload,
  };
};

export const removeCart = (id) => {
  return {
    type: REMOVE_CART,
    payload: id,
  };
};

export const getSearchResults = (products, searchTerm) => {
  return function (dispatch) {
    const results = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch({ type: GET_SEARCH_RESULTS, payload: results });
  };
};

// export const setSearchTerm = (searchTerm) => {
//     return {
//         type: SET_SEARCH_TERM, searchTerm
//     }
// }

// export const setSearchResults = (results) => {
//     return {
//         type: SET_SEARCH_RESULTS, results
//     }
// }

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

export const cleanCategoryProducts = () => {
  return { type: CLEAN_CATEGORY_PRODUCTS };
};

// export const getUser = () => {
//   return async function (dispatch) {
//     const user = await axiosInstance.get("/");
//   };
// };

export const setLoggedUser = (user) => {
  return {
    type: SET_LOGGED_USER,
    payload: user,
  };
};
