const initialState = {
    products:[],
    detail: {},
    categories: [],
    productsByCategory:[],
    filtered: [],
    cart: [],
    favorites: [],
    darkMode: false,
    // searchTerm:'',
    // searchResults:[],
    results:[],
    results2:[],
    reviews: [],
    currentUser: {},
    // user: false,
    tokenAccepted: '',
    searchTerm: '',
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
                cart: state.cart.filter(c => c.id !== action.payload)
            }
        case 'TOGGLE_DARK_MODE':
                return {
                  ...state,
                  darkMode: !state.darkMode
                };
        // case 'SET_SEARCH_TERM':
        //     return {
        //         ...state,
        //         searchTerm: action.searchTerm
        //     }
        // case 'SET_SEARCH_RESULTS':
        //     return {
        //         ...state,
        //         searchResults: action.results,
        //     }
        case 'GET_SEARCH_RESULTS':
            return {
                ...state,
                results: action.payload,
            }
        case 'GET_RESULTS':
            return {
                ...state,
                results2: action.payload,
            }
        case 'COMPLETE_PROFILE':
            return {
                ...state,
                currentUser: action.payload,
            }
        case 'GET_REVIEWS_BY':
            return {
                ...state,
                reviews: action.payload
            }
        case 'STATUS_REGISTER':
            return {
                ...state,
                tokenAccepted: action.payload
            }
        case 'GET_SEARCH_TERM':
            return{
                ...state,
                searchTerm: action.payload,
            }
        default:
            return {...state}
    }
}