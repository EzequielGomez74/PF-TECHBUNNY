import { GET_ALL_PRODUCTS, GET_CATEGORIES, GET_PRODUCT_BY_ID, GET_PRODUCTS_BY_CATEGORY, FILTER_BY_BRAND, ORDER_BY_PRICE, ADD_FAVORITE, ADD_CART, REMOVE_CART, REMOVE_FAVORITE, TOGGLE_DARK_MODE, GET_SEARCH_RESULTS, COMPLETE_PROFILE, GET_REVIEWS_BY, STATUS_REGISTER } from './actionTypes'
// import { bindActionCreators } from 'redux'
import axiosInstance from "./axiosInstance";
import axios from "axios";


export function getProducts () {
    return async function (dispatch){
        try{
            var json = await axios.get('http://localhost:3001/products')
            return dispatch({type: GET_ALL_PRODUCTS, payload: json.data});
        }catch(error){
            alert(error)
        }
    }
}

// export const getProducts = () => {
//     return function(dispatch){
//         return fetch ('http://localhost:3001/products')
//         .then(resp => resp.json())
//         .then(data => dispatch({type: GET_ALL_PRODUCTS, payload: data}))
//         .catch(error => console.log(error))
//     }
// }

export function getProductById(id) {
    return async function (dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/products/${id}`)
            return dispatch({type: GET_PRODUCT_BY_ID, payload: json.data});
        }catch(error){
            alert(error)
        }
    }
}

// export const getProductById = (id) => {
//     return function(dispatch){
//         return fetch (`http://localhost:3001/products/${id}`)
//         .then(resp => resp.json())
//         .then(data => dispatch({type: GET_PRODUCT_BY_ID, payload: data}))
//         .catch(error => console.log(error))
//     }
// }

export function getCategories () {
    return async function (dispatch){
        try{
            var json = await axios.get('http://localhost:3001/categories')
            return dispatch({type: GET_CATEGORIES, payload: json.data});
        }catch(error){
            alert(error)
        }
    }
}

// export const getCategories = () => {
//     return function(dispatch){
//         return fetch ('http://localhost:3001/categories')
//         .then(resp => resp.json())
//         .then(data => dispatch({type: GET_CATEGORIES, payload: data}))
//         .catch(error => console.log(error))
//     }
// }

export function getProductsByCategory(category) {
    return async function (dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/products?category=${category}`)
            return dispatch({type: GET_PRODUCTS_BY_CATEGORY, payload: json.data});
        }catch(error){
            alert(error)
        }
    }
}

// export const getProductsByCategory = (category) => {
//     return function(dispatch){
//         // let Capitalize = category[0].toUpperCase() + category.slice(1)
//         return fetch (`http://localhost:3001/products?category=${category}`)
//         .then(resp => resp.json())
//         .then(data => dispatch({type: GET_PRODUCTS_BY_CATEGORY, payload: data}))
//         .catch(error => console.log(error))
//     }
// }


export const filterByBrand = (products, brand) => {
    return function(dispatch){
        const filteredByBrand = products.filter((p) => p.brand === brand)
        dispatch({type: FILTER_BY_BRAND, payload: filteredByBrand})
    }
}

// export const filterByPrice = (products, max, min) => {
//     return function(dispatch){
//         const filteredByPrice = products.filter((p) => p.price < max && p.price > min)
//         dispatch({type: FILTER_BY_PRICE, payload: filteredByPrice})
//     }
// }

export const orderByPrice = (products, order) => {
    return function(dispatch){
        if(order === 'asc'){
            const asc = products.sort((a,b)=>{
                if(a.price < b.price) return -1;
                if(a.price > b.price) return 1;
                else return 0;
            })
            dispatch({type: ORDER_BY_PRICE, payload:[...asc]})
        }
        if(order === 'desc'){
            const desc = products.sort((a,b)=>{
                if(a.price > b.price) return -1;
                if(a.price < b.price) return 1;
                else return 0;
            })
            dispatch({type: ORDER_BY_PRICE, payload:[...desc]})
        }
    }
}

export const addFavorite = (payload) => {
    return {
        type: ADD_FAVORITE, payload
    }
}

export const removeFavorite = (id) => {
    return {
        type: REMOVE_FAVORITE, payload: id
    }
}


export const addCart = (payload) => {
    return {
        type: ADD_CART, payload
    }
}

export const removeCart = (id) => {
    return {
        type: REMOVE_CART, payload: id
    }
}

export function toggleDarkMode() {
    return { type: TOGGLE_DARK_MODE };
  }

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

export const getSearchResults = (products, searchTerm) => {
    return function(dispatch){
        const results = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        dispatch({type: GET_SEARCH_RESULTS, payload: results})
    }
}

export const completeProfile = (payload) => {
    return { type: COMPLETE_PROFILE, payload }
}

export const getReviewsBy = (productId, userId) => {
    return async function (dispatch) {
      try {
        const response = await axios.get(
          `http://localhost:3001/reviews?product_id=${productId}`
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
        let postedReview = await axios.post(
          "http://localhost:3001/reviews",
          review
        );
        onSuccess();
        return postedReview;
      } catch (error) {
        console.log(error);
      }
    };
};

//Verificación del Mail
export const statusRegister = (token) => {
    return async function(dispatch) {
        try{
            let validate = await axios.put(`http://localhost:3001/verify/${token}`)
            // if validate.data.notAccepted === 'FAIL' || 'SUCCESS'
            return dispatch({type: STATUS_REGISTER, payload: validate.data.status})
        }catch(error){
            alert(error)
        }
    }
}
