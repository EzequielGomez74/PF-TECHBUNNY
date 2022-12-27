import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import axios from "axios";

async function handleLogin() {
  //const config = {Authorization:"Bearer "+}
  const data = { username: "Betolocura", password: "pepito123" };
  const response = await axios.put("http://localhost:3001/enter/login", data);
  console.log("response token ", response.data.accessToken);
  sessionStorage.setItem("accessToken", response.data.accessToken);
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
        <div className="btnLogin" onClick={handleLogin}>
          <Link to="/">
            <h2>Login</h2>
          </Link>
        </div>
        <div className="btnInv">
          <Link to="/home">
            <h2>Invitado</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
