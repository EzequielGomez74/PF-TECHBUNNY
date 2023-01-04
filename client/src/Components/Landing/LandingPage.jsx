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
     </div>
  );
}