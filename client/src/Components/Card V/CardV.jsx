import React from "react";
// import ReactDOM from "react-dom";
import s from './CardV.module.css';
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";



function CardV({id, brand, name, image, price, category, subcategory}){
    return(
<<<<<<< HEAD
    
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
     
=======
    <div>
        <div className={s.card}>
            <div className={s.iconWrap}>
                <button className={s.heart}><FontAwesomeIcon icon={faHeart} /></button>
            </div>
            <Link to={`/detail/${id}`}><img className={s.img} src={image} alt={id} /></Link>
            <p className={s.brand}>{brand}</p>
            <Link to={`/detail/${id}`}><p className={s.name}>{name}</p></Link>
            <p className={s.price}>US${price}</p>
        </div>
    </div>
>>>>>>> a53434b3716cd655b308b52864c0b7c4f263fd33
    )
};

export default CardV;