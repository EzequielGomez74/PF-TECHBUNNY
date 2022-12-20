import React from 'react'
import imgnew from "../../Photos/logonew.png";
import "./Newsletter.css";
function Newsletter() {
  return (
    <div className='maincointainer'>
        <div className='imgcontainer'><img className='imgsize' src={imgnew} alt="not found" /></div>
        <div className="textandinput">
            <h2>Suscríbete al Newsletter</h2>
            </div>
    </div>
  )
}

export default Newsletter