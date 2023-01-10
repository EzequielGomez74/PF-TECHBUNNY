import React from 'react'
import "./Newsletter.css";
import imgNewsletter from "../../Photos/imgNewsletter.png";


function Newsletter() {
  return (
    <div className='maincointainer'>
        <div className='prueba'>
        <div className='imgcontainer'>
            <img className='imgNewsletter' src={imgNewsletter}  alt="not found" />
        </div>
        <div className="textandinput">
            <h2>Suscríbete al Newsletter</h2>
            <input type="search" className='inputText' placeholder={`Correo electrónico`} />
            <button className='inputBtn'>SUSCRIBIRSE</button>
            </div>
        </div>
            
    </div>
  )
}
//newsletter 
export default Newsletter