// import store from "./store";
import axiosInstance from "./axiosInstance";
// import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  GET_CATEGORIES,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS_BY_CATEGORY,
  FILTER_BY,
  SORT_BY_PRICE,
  ADD_CART,
  ALL_CART_BY_USER,
  TOGGLE_DARK_MODE,
  GET_SEARCH_RESULTS,
  CLEAN_SEARCH_RESULTS,
  GET_REVIEWS_BY,
  SET_LOGGED_USER,
  CLEAN_DETAIL,
  CLEAN_CATEGORY_PRODUCTS,
  GET_USER_BY_ID,
  ALL_FAVORITES_BY_USER,
  CLEAN_FAVORITES,
  ADD_FAVORITE,
  ADD_OR_REMOVE_QUANTITY_FROM_CART,
  CREATE_ORDER,
  ALL_ORDERS_BY_USER,
  GET_PAYPREFERENCES_BY_ID,
  GET_CARROUSEL,
  UPDATE_USER_INFO,
  GET_PRODUCTS_BY_BRAND,
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
      let json = await axiosInstance.get(`/products?category=${category}`);
      return dispatch({ type: GET_PRODUCTS_BY_CATEGORY, payload: json.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getProductsByBrand() {
  return async function (dispatch) {
    try {
      let json = await axiosInstance.get(`/products?category=Periféricos`);
      return dispatch({ type: GET_PRODUCTS_BY_BRAND, payload: json.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const filterBy = (subcategory, brand) => {
  return { type: FILTER_BY, payload: { subcategory, brand } };
};

// export const filterByBrand = (brand) => {
//   return { type: FILTER_BY_BRAND, payload: brand };
// };


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

export function getUserById(user_id) {
  return async function (dispatch) {
    try {
      let user = await axiosInstance.get(`/users/${user_id}`);
      return dispatch({ type: GET_USER_BY_ID, payload: user.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const allFavoritesByUser = (user_id) => {
  return async function (dispatch) {
    const favorites = await axiosInstance.get(`/favorites/${user_id}`);
    return dispatch({ type: ALL_FAVORITES_BY_USER, payload: favorites.data });
  };
};

export const addFavorite = (payload) => {
  return async function (dispatch) {
    try {
      const response = await axiosInstance.post("/favorites", payload);
      //return dispatch ({type: ADD_FAVORITE, payload: fav.data});
      console.log(response.data);
      const favorites = await axiosInstance.get(
        `/favorites/${payload.user_id}`
      );
      return dispatch({ type: ADD_FAVORITE, payload: favorites.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const cleanFavorite = () => {
  return { type: CLEAN_FAVORITES };
};

export const removeFavorite = (payload) => {
  return async function () {
    try {
      const response = await axiosInstance.post("/favorites", payload);
      //return dispatch ({type: ADD_FAVORITE, payload: fav.data});
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const addCart = (payload, user_id) => {
  return async function (dispatch) {
    try {
      console.log("entra a addCart", payload);
      let response = await axiosInstance.post(`/carts/${user_id}`, payload);
      console.log("producto recibido", response.data);
      let cart = await axiosInstance.get(`/carts/${user_id}`);
      console.log(cart.data);
      return dispatch({ type: ADD_CART, payload: cart.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

//MODIFICAR ESTA ACCIÓN POR LA DE ARRIBA.
// export const addCart = (payload) => {
//   return {
//     type: ADD_CART,
//     payload,
//   };
// };

export const removeCart = (user_id, product_id, onSuccess) => {
  return async function () {
    try {
      console.log(user_id, product_id, "Eliminando de carrito");
      const productDeleted = await axiosInstance.delete(`/carts/${user_id}`, {
        data: { product_id },
      });
      // await axiosInstance.get(`/carts/${user_id}`)
      onSuccess();
      console.log(productDeleted);
    } catch (error) {
      console.log(error);
    }
  };
};

export const allCartByUser = (user_id) => {
  return async function (dispatch) {
    const carts = await axiosInstance.get(`/carts/${user_id}`);
    return dispatch({ type: ALL_CART_BY_USER, payload: carts.data });
  };
};

// export const removeCart = (id) => {
//   return {
//     type: REMOVE_CART,
//     payload: id,
//   };
// };

export const getSearchResults = (searchTerm) => {
  return { type: GET_SEARCH_RESULTS, payload: searchTerm };
};

export const cleanSearchResults = () => {
  return { type: CLEAN_SEARCH_RESULTS };
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
  console.log("action logded user");
  try {
    return {
      type: SET_LOGGED_USER,
      payload: user,
    };
  } catch (error) {
    console.log(error);
  }
};

export function addOrRemoveQuantityFromCart(id, count) {
  return {
    type: ADD_OR_REMOVE_QUANTITY_FROM_CART,
    payload: { id, count },
  };
}

export const createOrder = (user_id, pushPayment) => {
  return async function (dispatch) {
    try {
      const response = await axiosInstance.post(`/orders/${user_id}`);
      //return dispatch ({type: ADD_FAVORITE, payload: fav.data});
      console.log(response.data);
      const orders = await axiosInstance.get(`/orders?user_id=${user_id}`);
      console.log(orders.data);
      pushPayment();
      return dispatch({ type: CREATE_ORDER, payload: orders.data });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const allOrdersByUser = (user_id) => {
  return async function (dispatch) {
    const orders = await axiosInstance.get(`/orders?user_id=${user_id}`);
    console.log(orders.data);
    return dispatch({ type: ALL_ORDERS_BY_USER, payload: orders.data });
  };
};

//verificar si está bien la función
export const updateOrderInfoById = (order_id, payInfo) => {
  return async function () {
    try {
      const userInfo = await axiosInstance.put(`/orders/${order_id}`, payInfo);
      console.log(userInfo.data);
    } catch (error) {
      console.log(error);
    }
  };
};

export function getPayPreferencesById(order_id) {
  return async function (dispatch) {
    try {
      var json = await axiosInstance.get(`/orders/pagar/${order_id}`);
      console.log("info payment", json.data);
      return dispatch({ type: GET_PAYPREFERENCES_BY_ID, payload: json.data });
    } catch (error) {
      alert(error);
    }
  };
}
export function getCarrousel(carrouselType) {
  return async function (dispatch) {
    try {
      var json = await axiosInstance.get(`/carrousels/${carrouselType}`);
      console.log("ALGO QUE LLEGO ", carrouselType, " ", json.data);
      return dispatch({
        type: GET_CARROUSEL,
        payload: { carrouselData: json.data, carrouselType },
      });
    } catch (error) {
      alert(error);
    }
  };
}

export function updateUserInfo(user_id, input) {
  return async function (dispatch) {
    try {
      const userInfoGet = await axiosInstance.get(`/users/${user_id}`);
      console.log(userInfoGet.data);
      const userInfo = await axiosInstance.put(`/users/${user_id}`, input);
      console.log(userInfo.data);
      return dispatch({ type: UPDATE_USER_INFO, payload: userInfo.data });
    } catch (error) {
      console.log(error);
    }
  };
}
