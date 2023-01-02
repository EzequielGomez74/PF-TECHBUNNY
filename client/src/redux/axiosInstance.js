import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = sessionStorage.getItem("accessToken");
    console.log("1", token);
    if (!token) {
      const body = {
        username: "anonimo",
        password: "anonimo",
        token: null,
        guest: true,
      };
      const response = await axios.put(
        "http://localhost:3001/enter/login",
        body,
        { withCredentials: true }
      );
      console.log("GUEST LOGIN ", response.data);
      token = response.data.accessToken;
      sessionStorage.setItem("accessToken", token);
    }
    console.log("token ultimo", token);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
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
        }
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
