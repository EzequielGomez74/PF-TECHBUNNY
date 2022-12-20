import React from "react";
import "./CardV.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";



function CardV({id, brand, name, image, price, category, subcategory}){
    return(
    <div className="cardSuper">
     <div className="cardContainer">
        <div className="cardIcono">
            <FontAwesomeIcon className="icono" icon={faHeart}></FontAwesomeIcon>
        </div>
        <div className="cardImg">
            <img src={image} alt={id} />
        </div>
        <h2 className="cardTitle">{brand}</h2>
        <h3 className="cardText">{name}</h3>
        <p className="price">${price}</p>
     </div>
    </div>
    )
};

export default CardV;