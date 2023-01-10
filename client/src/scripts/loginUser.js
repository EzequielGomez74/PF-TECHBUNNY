import axios from "axios";
import { setLoggedUser } from "../redux/actions";
import store from "../redux/store";

const loginUser = async (data) => {
  try {
    //const config = {Authorization:"Bearer "+}
    console.log("1 body ", data);
    const response = await axios.put("/enter/login", data, {
      withCredentials: true,
    });
    if (response.data.accessToken) {
      console.log("2 token ", response.data.accessToken);
      sessionStorage.setItem("accessToken", response.data.accessToken);
      if (response.data.user) {
        //!response.data tambien trae info de la session (carrito,etc) se va a llamar savedSessionData
        console.log("setL");
        await store.dispatch(setLoggedUser(response.data.user));
      }
    } else if (response.data.twoFactor) {
      //? response.data === {twoFactor:true,(tokenId:..pa12.. || (username:"pepe",password:"123"))}
      //generar un pop up para ingresar el codigo que te aparece en el celular
      //vuelvo a ejecutar /enter/login
      //todo aca hacer el 2FA
    } else if (response.data === null) {
      return "TOKEN INCORRECTO, REINGRESAR";
    }
  } catch (error) {
    //metio mal
  }
};

export default loginUser;