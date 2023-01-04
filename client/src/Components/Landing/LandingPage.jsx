import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.scss";

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="divTitulo">
      <Link to="/home">
       <h1>INGRESA A TECHBUNNY</h1>
      </Link>
      </div>
      
        <p class="typing-animation">¡Bienvenido a nuestro ecommerce de tecnología! Somos una empresa líder en la venta de productos de alta calidad y con las últimas innovaciones en el mercado. 
        <br/>
          

       Nuestro objetivo es ofrecerte lo mejor de la tecnología a precios competitivos y con un servicio de atención al cliente excepcional. 
       
        <br/>
        No dudes en echar un vistazo a nuestro catálogo y descubrir todo lo que tenemos para ofrecerte. ¡Te esperamos!
        </p>
     
     </div>
  );
}