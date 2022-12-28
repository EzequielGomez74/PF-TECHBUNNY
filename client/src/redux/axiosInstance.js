import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    console.log(token);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
      config.credentials = "include";
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
          } else {
            //sino tiene que desloguear al user porque el refresh token esta vencido
            //MANDAR DESDE EL FRONT A LA RUTA LOGIN Y SI QUIERE SE RELOGUEA DE NUEVO, YA QUE LA SESSION EXPIRO
            //se deberia hacer un request de tipo /enter/logout
            console.log("DESLOGUEAR");
          }
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
