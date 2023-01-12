const initialState = {
  products: [],
  detail: {},
  categories: [],
  productsByCategory: [],
  filtered: [],
  cart: [],
  favorites: [],
  darkMode: false,
  reviews: [],
  // searchTerm:'',
  // searchResults:[],
  results: [],
  loggedUser: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "GET_PRODUCT_BY_ID":
      return {
        ...state,
        detail: action.payload,
      };
    case "GET_PRODUCTS_BY_CATEGORY":
      return {
        ...state,
        productsByCategory: action.payload,
        filtered: action.payload,
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "FILTER_BY_BRAND":
      const allProductsByCategory = [...state.filtered];
      const filteredProducts =
        action.payload === "none"
          ? allProductsByCategory
          : allProductsByCategory.filter((p) =>
              p.brand.includes(action.payload)
            );
      return {
        ...state,
        productsByCategory: filteredProducts,
      };
    case "SORT_BY_PRICE":
      const orderedProductsByPrice = state.productsByCategory.sort(function (
        a,
        b
      ) {
        if (action.payload === "asc") {
          if (a.price < b.price) {
            return -1;
          } else if (a.price > b.price) {
            return 1;
          } else {
            return 0;
          }
        } else if (action.payload === "desc") {
          if (a.price > b.price) {
            return -1;
          } else if (a.price < b.price) {
            return 1;
          } else {
            return 0;
          }
        }
        return "Ordered";
      });
      return {
        ...state,
        productsByCategory: orderedProductsByPrice,
      };
    // case "FILTER_BY_PRICE":
    //   return {
    //     ...state,
    //     filtered: action.payload,
    //   };
    // case "ORDER_BY_PRICE":
    //   return {
    //     ...state,
    //     filtered: action.payload,
    //   };
    case "ALL_FAVORITES_BY_USER":
      return {
        ...state,
        favorites: action.payload,
      };
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: action.payload,
      };
      case "CLEAN_FAVORITES": {
        return {
          ...state,
          favorites: [],
        };
      }
    // case "REMOVE_FAVORITE":
    //   return {
    //     ...state,
    //     favorites: state.favorites.filter((f) => f.product_id !== action.payload),
    //   };
    case "ADD_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload),
      };
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        darkMode: !state.darkMode,
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
    case "GET_SEARCH_RESULTS":
      return {
        ...state,
        results: action.payload,
      };
    case "GET_LOGGED_USER": {
      return {
        ...state,
      };
    }
    case "SET_LOGGED_USER":
      return {
        ...state,
        loggedUser: action.payload,
      };
    case "GET_REVIEWS_BY":
      return {
        ...state,
        reviews: action.payload,
      };
      case "ADD_OR_REMOVE_QUANTITY_FROM_CART":
        const productFound = state.cart.find((p) => p.id === action.payload.id);
        if (productFound) {
          productFound.totalQuantity -= action.payload.totalQuantity;
        }
        return { ...state, cart: [...state.cart] };

    case "CLEAN_DETAIL":
      return { ...state, detail: {} };
    case "CLEAN_CATEGORY_PRODUCTS":
      return { ...state, productsByCategory: [] };
    default:
      return { ...state };
  }
}