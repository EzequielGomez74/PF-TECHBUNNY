import React from "react";
import img from "../../Photos/auriejemplo.png";
import "./CardV.css";
import fav from "../../Photos/iconofav.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";



function CardV(){
    const cardPrueba = {
        icono: fav,
        img: img,
        title: "SKULLCANDY",
        sub1: "Skullcandy Crusher",
        sub2: "Bluetooth Sound Bass",
        price: 4463.53,
    }
    return(
    <div className="cardSuper">
     <div className="cardContainer">
        <div className="cardIcono">
            <FontAwesomeIcon className="icono" icon={faHeart}></FontAwesomeIcon>
        </div>
        <div className="cardImg">
            <img src={cardPrueba.img} alt="img"/>
        </div>
        <h2 className="cardTitle">{cardPrueba.title}</h2>
        <h3 className="cardText">{cardPrueba.sub1}</h3>
        <h3 className="cardText">{cardPrueba.sub2}</h3>
        <p className="price">$ {cardPrueba.price}</p>
     </div>
     </div>
    )
};

export default CardV;