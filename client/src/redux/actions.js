import { GET_ALL_PRODUCTS, FILTER_BY_CATEGORY } from './actionTypes'

export const getProducts = () => {
    return function(dispatch){
        return fetch ('http://localhost:3001/products')
        .then(resp => resp.json())
        .then(data => dispatch({type: GET_ALL_PRODUCTS, payload: data}))
        .catch(error => console.log(error))
    }
}

export const filterByCategory = (products, idCategory) => {
    return function(dispatch){
        const filtered = products.filter(p => p.category === idCategory)
        dispatch({type:FILTER_BY_CATEGORY, payload: filtered})
    }
}