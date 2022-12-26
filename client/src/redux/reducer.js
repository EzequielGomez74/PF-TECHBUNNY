const initialState = {
    products:[],
    detail: {},
    categories: [],
    productsByCategory:[],
    filtered: [],
    cart: [],
    favorites: []
}

export default function reducer (state=initialState, action){
    switch (action.type) {
        case 'GET_ALL_PRODUCTS':
            return {
                ...state,
                products: action.payload,
            }
        case 'GET_PRODUCT_BY_ID':
            return {
                ...state,
                detail: action.payload,
            }
        case 'GET_PRODUCTS_BY_CATEGORY':
            return{
                ...state,
                productsByCategory: action.payload,
            }
        case 'GET_CATEGORIES':
            return{
                ...state,
                categories: action.payload,
            }
        case 'FILTER_BY_BRAND':
            return{
                ...state,
                filtered: action.payload,
            }
        case 'FILTER_BY_PRICE':
            return{
                ...state,
                filtered: action.payload,
            }
        case 'ORDER_BY_PRICE':
            return{
                ...state,
                filtered: action.payload,
            }
        case 'ADD_FAVORITE':
            return{
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        case 'REMOVE_FAVORITE':
            return{
                ...state,
                favorites: state.favorites.filter(f => f.id !== action.payload)
            }
        case 'ADD_CART':
            return{
                ...state,
                cart: [...state.cart, action.payload]
            }
        case 'REMOVE_CART':
            return{
                ...state,
                cart: state.cart.filter(f => f.product_id !== action.payload)
            }
        default:
            return {...state}
    }
}