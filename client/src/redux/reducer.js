const initialState = {
  products: [],
  detail: {},
  categories: [],
  reviews: [],
  productsByCategory: [],
  filtered: [],
  cart: [],
  favorites: [],
  users: [],
  currentUser: {
    user_id: 1,
    name: "Beto",
    surname: "Martinez",
    username: "Betolocura",
    password: "pepito123",
    email: "a@a.gmail.com",
    billingAddress: "",
    defaultShippingAddress: "Colon 1234",
    zipCode: "7600",
    role: 2,
    isActive: null,
    needPasswordReset: null,
    profilePicture: null,
    refreshToken: null,
    isLogged: false,
    createdAt: "2022-12-29T15:16:23.109Z",
    updatedAt: "2022-12-29T15:16:23.109Z",
    country_id: null,
  },
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

    case "CLEAN_PRODUCT_DETAIL":
      return {
        ...state,
        detail: {},
      };

    case "GET_PRODUCTS_BY_CATEGORY":
      return {
        ...state,
        productsByCategory: action.payload,
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "GET_REVIEWS_BY":
      return {
        ...state,
        reviews: action.payload,
      };
    case "GET_ALL_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "FILTER_BY_BRAND":
      return {
        ...state,
        filtered: action.payload,
      };
    case "FILTER_BY_PRICE":
      return {
        ...state,
        filtered: action.payload,
      };
    case "ORDER_BY_PRICE":
      return {
        ...state,
        filtered: action.payload,
      };
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((f) => f.id !== action.payload),
      };
    case "ADD_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_CART":
      return {
        ...state,
        cart: state.cart.filter((f) => f.product_id !== action.payload),
      };
    default:
      return { ...state };
  }
}
