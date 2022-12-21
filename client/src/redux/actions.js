import { GET_ALL_PRODUCTS, GET_CATEGORIES, GET_PRODUCT_BY_ID } from './actionTypes'

export const getProducts = () => {
    return function(dispatch){
        return fetch ('http://localhost:3001/products')
        .then(resp => resp.json())
        .then(data => dispatch({type: GET_ALL_PRODUCTS, payload: data}))
        .catch(error => console.log(error))
    }
}
export const getProductById = (id) => {
    return function(dispatch){
        return fetch (`http://localhost:3001/products/${id}`)
        .then(resp => resp.json())
        .then(data => dispatch({type: GET_PRODUCT_BY_ID, payload: data}))
        .catch(error => console.log(error))
    }
}

export const getCategories = () => {
    return function(dispatch){
        return fetch ('http://localhost:3001/categories')
        .then(resp => resp.json())
        .then(data => dispatch({type: GET_CATEGORIES, payload: data}))
        .catch(error => console.log(error))
    }
}

