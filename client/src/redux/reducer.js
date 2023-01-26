import { GET_ALL_STATISTICS, GET_SUBCATEGORY_BY_CATEGORY } from "./actionTypes";
// import { GET_CARROUSEL } from "./actionTypes";
const initialState = {
  products: [],
  detail: {},
  categories: [],
  productsByCategory: [],
  productsByBrand: [],
  filtered: [],
  cart: [],
  favorites: [],
  darkMode: false,
  reviews: [],
  orders: [],
  orderStatus: [],
  ordersByUser: [],
  allOrders: [],
  // searchTerm:'',
  // searchResults:[],
  results: [],
  loggedUser: {},
  preferences: {},
  favoritesCarrousel: [],
  ordersCarrousel: [],
  usersDashboard: [],
  allStatistics: {},
  subcategoriesByCategory: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "POST_PRODUCT":
      return {
        ...state,
        products: action.payload,
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: action.payload,
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: action.payload,
      };
    case "GET_USERS":
      return {
        ...state,
        usersDashboard: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        usersDashboard: action.payload,
      };
    case "DELETE_USER":
      return {
        ...state,
        usersDashboard: action.payload,
      };
    case "GET_ORDERS":
      return {
        ...state,
        allOrders: action.payload,
      };
    case "GET_ORDER_STATUS":
      return {
        ...state,
        orderStatus: action.payload,
      };
    case "UPDATE_ORDER":
      return {
        ...state,
        allOrders: action.payload,
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
    case "GET_PRODUCTS_BY_BRAND":
      return {
        ...state,
        productsByBrand: action.payload,
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "FILTER_BY":
      const allProductsByCategory = [...state.filtered];
      const filteredProducts =
        action.payload.subcategory === "none" && action.payload.brand === "none"
          ? allProductsByCategory
          : action.payload.subcategory !== "none" &&
            action.payload.brand === "none"
          ? allProductsByCategory.filter((p) =>
              p.subcategory.includes(action.payload.subcategory)
            )
          : action.payload.subcategory === "none" &&
            action.payload.brand !== "none"
          ? allProductsByCategory.filter((p) =>
              p.brand.includes(action.payload.brand)
            )
          : allProductsByCategory
              .filter((p) => p.subcategory.includes(action.payload.subcategory))
              .filter((p) => p.brand.includes(action.payload.brand));

      return {
        ...state,
        productsByCategory: filteredProducts.length > 0 ? filteredProducts : [null],
      };
    // case "FILTER_BY_BRAND":
    //   const allProductsByCategory = [...state.filtered];
    //   const filteredProducts =
    //     action.payload === "none"
    //       ? allProductsByCategory
    //       : allProductsByCategory.filter((p) =>
    //           p.brand.includes(action.payload)
    //         );
    //   return {
    //     ...state,
    //     productsByCategory: filteredProducts,
    //   };
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
        cart: action.payload,
      };
    case "ALL_CART_BY_USER":
      return {
        ...state,
        cart: action.payload,
      };
    // case "REMOVE_CART":
    //   return {
    //     ...state,
    //     cart: state.cart.filter((c) => c.id !== action.payload),
    //   };
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
      const searched = state.products.filter((p) =>
        p.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        results: searched,
      };
    case "CLEAN_SEARCH_RESULTS":
      return {
        ...state,
        results: [],
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
        productFound.count = productFound.count - action.payload.count;
      }
      return { ...state, cart: [...state.cart] };

    case "CLEAN_DETAIL":
      return { ...state, detail: {} };
    case "CLEAN_CATEGORY_PRODUCTS":
      return { ...state, productsByCategory: [] };
    case "CREATE_ORDER":
      return {
        ...state,
        orders: action.payload,
      };
    case "ALL_ORDERS_BY_USER":
      return {
        ...state,
        ordersByUser: action.payload,
      };
    case "GET_PAYPREFERENCES_BY_ID":
      return {
        ...state,
        preferences: action.payload,
      };
    case "GET_CARROUSEL":
      if (action.payload.carrouselType === "favorites")
        return {
          ...state,
          favoritesCarrousel: action.payload.carrouselData,
        };
      else
        return {
          ...state,
          ordersCarrousel: action.payload.carrouselData,
        };
    case "UPDATE_USER_INFO":
      return {
        ...state,
        loggedUser: { ...state.loggedUser, ...action.payload },
      };
    case "GET_ALL_STATISTICS":
      return {
        ...state,
        allStatistics: action.payload,
      };
    case "GET_SUBCATEGORY_BY_CATEGORY":
      return {
        ...state,
        subcategoriesByCategory: action.payload,
      };
    default:
      return { ...state };
  }
}
