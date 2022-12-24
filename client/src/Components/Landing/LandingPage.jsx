import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="divTitulo">
      <Link to="/home">
       <h1>TECHBUNNY</h1>
      </Link>
      </div>
      <div className="divBtn">
       <div className="btnLogin">
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