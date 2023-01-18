import axios from "axios";
import { setLoggedUser } from "../redux/actions";
import store from "../redux/store";

const loginUser = async (data, onResponse) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    let config = {};
    if (accessToken) {
      config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
    }
    const response = await axios.put("/enter/login", data, config);
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      if (response.data.user) {
        //!response.data tambien trae info de la session (carrito,etc) se va a llamar savedSessionData
        await store.dispatch(setLoggedUser(response.data.user));
      }
      //TODO MANEJAR CALLBACK DE RESPUESTA OK
      onResponse("SUCCESS");
    } else if (response.data.twoFactor) {
      //? response.data === {twoFactor:true,(tokenId:..pa12.. || (username:"pepe",password:"123"))}
      //generar un pop up para ingresar el codigo que te aparece en el celular
      //vuelvo a ejecutar /enter/login
      //todo aca hacer el 2FA
    } else if (response.data === null) {
      return "TOKEN INCORRECTO, REINGRESAR";
    } else if (response.data.status) {
      onResponse(response.data.status);
    }
  } catch (error) {
    //metio mal
  }
};

export default loginUser;
