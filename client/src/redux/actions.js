import store from "./store";
import axiosInstance from "./axiosInstance";
import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  GET_CATEGORIES,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS_BY_CATEGORY,
  FILTER_BY_BRAND,
  ORDER_BY_PRICE,
  ADD_FAVORITE,
  ADD_CART,
  REMOVE_CART,
  REMOVE_FAVORITE,
  TOGGLE_DARK_MODE,
  GET_SEARCH_RESULTS,
  GET_REVIEWS_BY,
  FILTER_BY_PRICE,
  GET_LOGGED_USER,
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
      let postedReview = await axiosInstance.post("/reviews", review);
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
      var json = await axiosInstance.get(`/products?category=${category}`);
      return dispatch({ type: GET_PRODUCTS_BY_CATEGORY, payload: json.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const filterByBrand = (products, brand) => {
  return function (dispatch) {
    const filteredByBrand = products.filter((p) => p.brand === brand);
    dispatch({ type: FILTER_BY_BRAND, payload: filteredByBrand });
  };
};

export const filterByPrice = (products, max, min) => {
  return function (dispatch) {
    const filteredByPrice = products.filter(
      (p) => p.price < max && p.price > min
    );
    dispatch({ type: FILTER_BY_PRICE, payload: filteredByPrice });
  };
};

export function toggleDarkMode() {
  return { type: TOGGLE_DARK_MODE };
}

// export const filterByPrice = (products, max, min) => {
//     return function(dispatch){
//         const filteredByPrice = products.filter((p) => p.price < max && p.price > min)
//         dispatch({type: FILTER_BY_PRICE, payload: filteredByPrice})
//     }
// }

export const orderByPrice = (products, order) => {
  return function (dispatch) {
    if (order === "asc") {
      const asc = products.sort((a, b) => {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        else return 0;
      });
      dispatch({ type: ORDER_BY_PRICE, payload: [...asc] });
    }
    if (order === "desc") {
      const desc = products.sort((a, b) => {
        if (a.price > b.price) return -1;
        if (a.price < b.price) return 1;
        else return 0;
      });
      dispatch({ type: ORDER_BY_PRICE, payload: [...desc] });
    }
  };
};

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

export const getUser = () => {
  return async function (dispatch) {
    const user = await axiosInstance.get("/");
  };
};

export const getLoginUser = (data) => {
  return async function (dispatch) {
    try {
      //const config = {Authorization:"Bearer "+}
      const response = await axios.put("/enter/login", data, {
        withCredentials: true,
      });
      if (response.data.accessToken) {
        console.log("deberia entrar ", response.data);
        sessionStorage.setItem("accessToken", response.data.accessToken);
        if (response.data.user) {
          //!response.data tambien trae info de la session (carrito,etc)
          return dispatch({
            type: GET_LOGGED_USER,
            payload: response.data.user,
          });
        }
      } else if (response.data.twoFactor) {
        //generar un pop up para ingresar el codigo que te aparece en el celular
        //vuelvo a ejecutar /enter/login
        //todo aca hacer el 2FA
      } else if (response.data === null) {
        return "TOKEN INCORRECTO, REINGRESAR";
      }
    } catch (error) {
      //metio mal
    }
  };
};
