const initialState = {
    products:[],
    detail: {},
    categories: [],
    productsByCategory:[],
    filtered: [],
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
        default:
            return {...state}
    }
}