import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import axios from "axios";

async function handleLogin(token) {
  try {
    //const config = {Authorization:"Bearer "+}
    const data = {
      username: "Betolocura",
      password: "pepito123",
      token,
      guest: false,
    };
    const response = await axios.put("/enter/login", data, {
      withCredentials: true,
    });
    if (response.data.accessToken) {
      sessionStorage.setItem("accessToken", response.data.accessToken);
      console.log("acces token seteado");
    } else if (response.data.twoFactor) {
      //generarpopup
    } else if (response.data === null) {
      return "TOKEN INCORRECTO, REINGRESAR";
    }
  } catch (error) {
    //metio mal
  }
}
export default function LandingPage() {
  return (
    <div className="landing">
      <div className="divTitulo">
        <Link to="/home">
          <h1>TECHBUNNY</h1>
        </Link>
      </div>
      <div className="divBtn">
        <div className="btnLogin" onClick={() => handleLogin()}>
          <Link to="/">
            <h2>Login</h2>
          </Link>
        </div>
        <div className="btnInv" onClick={() => handleLogin("qweqwe")}>
          <Link to="/home">
            <h2>Invitado</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
