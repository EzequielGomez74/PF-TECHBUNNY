

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
        //     const products = state.products
        //     const orderProductByPrice = products.sort(function(max,min){
        //         if(action.payload === 'asc'){
        //             if(max.price < min.price){
        //                 return -1;
        //             }else if(max.price > min.price){
        //                 return 1;
        //             }else{
        //                 return 0;
        //             }
        //         } else if (action.payload === 'desc'){
        //             if(max.price > min.price){
        //                 return -1;
        //             }else if(max.price < min.price){
        //                 return 1;
        //             }else{
        //                 return 0;
        //             }
        //         }
        //         return 'Ordered';
        //     })
        //     return{
        //         ...state,
        //         filtered: orderProductByPrice,
        //     };

        default:
            return {...state}
    }
}