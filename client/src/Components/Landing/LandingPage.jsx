import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.scss";
import img from '../../Photos/banner1.png'
import img1 from '../../Photos/Land1.png'
import img2 from '../../Photos/Land2.png'
import img3 from '../../Photos/Land3.png'


export default function LandingPage() {
  return (
    <div className="landing">
      <div className="divTitulo">
      <Link to="/home">
       <img src={img} className="banner" />
      </Link>
      </div>
     
       <p class="typing-animation">¡Bienvenido a nuestro ecommerce de tecnología!  <br/>Somos una empresa líder en la venta de productos de alta calidad  <br/>y con las últimas innovaciones en el mercado. 
        <br/>
          

       Nuestro objetivo es ofrecerte lo mejor de la tecnología a precios competitivos  <br/>y con un servicio de atención al cliente excepcional. 
       
        <br/>
        No dudes en echar un vistazo a nuestro catálogo y  <br/>descubrir todo lo que tenemos para ofrecerte. ¡Te esperamos!
        </p>
      
        <div>
          <img class="imgBanner" src={img1} />
          <img class="imgBanner" src={img2} />
          <img class="imgBanner" src={img3} />
        </div>
     </div>
  );
}