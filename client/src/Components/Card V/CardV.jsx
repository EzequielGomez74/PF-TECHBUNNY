import React from "react";
import s from './CardV.module.css';
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";



function CardV({id, brand, name, image, price, category, subcategory}){
    return(
    <div>
        <div className={s.card}>
            <FontAwesomeIcon className={s.heart} icon={faHeart} />
            <img className={s.img} src={image} alt={id} />
            <p className={s.brand}>{brand}</p>
            <Link to={`/detail/${id}`}><p className={s.name}>{name}</p></Link>
            <p className={s.price}>US${price}</p>
        </div>
    </div>
    )
};

export default CardV;