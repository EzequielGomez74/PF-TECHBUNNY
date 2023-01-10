import axios from "axios";
import store from "./store.js";
import loginUser from "../scripts/loginUser";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: "https://prueba1-production-4ff1.up.railway.app/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    if (Object.keys(state.loggedUser).length === 0) {
      let token = sessionStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
        await loginUser(null);
      } else {
        await loginUser(null);
      }
    } else {
      let token = sessionStorage.getItem("accessToken");
      if (token) config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/enter/login" && err.response) {
      // Access Token expiro . Mirar bien si 401 o 403 en el back
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await axiosInstance.get("/refresh");
          const { accessToken } = rs.data;
          if (accessToken) {
            //si hay acces token es porque salio todo bien y lo renueva
            sessionStorage.setItem("accessToken", accessToken);
            console.log("NUEVO TOKEN");
            return axiosInstance(originalConfig);
          }
        } catch (_error) {
          //sino tiene que desloguear al user porque el refresh token esta vencido
          //MANDAR DESDE EL FRONT A LA RUTA LOGIN Y SI QUIERE SE RELOGUEA DE NUEVO, YA QUE LA SESSION EXPIRO
          //se deberia hacer un request de tipo /enter/logout
          console.log("DESLOGUEAR");
          sessionStorage.removeItem("accessToken");
          // borra accessToken
        }
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
