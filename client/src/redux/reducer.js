const initialState = {
    products:[],
    detail: {},
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
        default:
            return {...state}
    }
}