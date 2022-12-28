import { GET_ALL_PRODUCTS, GET_CATEGORIES, GET_PRODUCT_BY_ID, GET_PRODUCTS_BY_CATEGORY, FILTER_BY_BRAND, FILTER_BY_PRICE, ORDER_BY_PRICE, ADD_FAVORITE, ADD_CART, REMOVE_CART, REMOVE_FAVORITE, TOGGLE_DARK_MODE } from './actionTypes'

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

export const getProductsByCategory = (category) => {
    return function(dispatch){
        // let Capitalize = category[0].toUpperCase() + category.slice(1)
        return fetch (`http://localhost:3001/products?category=${category}`)
        .then(resp => resp.json())
        .then(data => dispatch({type: GET_PRODUCTS_BY_CATEGORY, payload: data}))
        .catch(error => console.log(error))
    }
}

export const filterByBrand = (products, brand) => {
    return function(dispatch){
        const filteredByBrand = products.filter((p) => p.brand === brand)
        dispatch({type: FILTER_BY_BRAND, payload: filteredByBrand})
    }
}

export const filterByPrice = (products, max, min) => {
    return function(dispatch){
        const filteredByPrice = products.filter((p) => p.price < max && p.price > min)
        dispatch({type: FILTER_BY_PRICE, payload: filteredByPrice})
    }
}

// export const orderByPrice = (payload) => {
//     return function(dispatch){
//         dispatch({type: ORDER_BY_PRICE, payload})
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


