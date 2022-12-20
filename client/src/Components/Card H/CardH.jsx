import React from "react";
import img from "../../Photos/auriejemplo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {faMinus} from "@fortawesome/free-solid-svg-icons";
import "./CardH.css"


function CardH(){
    const cardPrueba = {
        img: img,
        marca:"Skullcandy Audífono Cassette Bt Black",
        disponible: "Disponible",
        cantidad: 1,
        price: 4463.53,
        
    }
    
    return(
        <div className="cardSuper">
        <div className="cardContainerH">
        
        <div className="imgandtitle">
            <img className="imgCard" src={cardPrueba.img} alt="img"/>
            <h2>{cardPrueba.marca}</h2>
        </div>
        <div className="secondhalf">
        <div className="cardDispon">
        <p >{cardPrueba.disponible}</p>
        </div>
        <div className="cardCant">
            <FontAwesomeIcon className="icon" icon={faMinus}/>
            {cardPrueba.cantidad}
            <FontAwesomeIcon className="icon" icon={faPlus}/>
        </div>
        <div className="priceH">
        <p>$ {cardPrueba.price}</p>
        </div>
        <div className="deleteicon">
            <FontAwesomeIcon className="icon" icon={faX}/>
        </div>
        </div>

        <div className="countandimg">
        <div className="cardCantmobile">
            <FontAwesomeIcon className="icon" icon={faPlus}/>
            {cardPrueba.cantidad}
            <FontAwesomeIcon className="icon" icon={faMinus}/>
        </div>
        <img className="imgCard" src={cardPrueba.img} alt="img"/>
        </div>
        <div className="titleandprice">
        <div className="titlemobile">
        <h6>{cardPrueba.marca}</h6>
        </div>
        <div className="pricemobile">
        <p>$ {cardPrueba.price}</p>
        </div>
        </div>
        <div className="deletebtn">
            <div className="btn">
            <FontAwesomeIcon className="icon" icon={faX}/>
            </div>
        </div>
        </div>
    </div>
    )
}

export default CardH;