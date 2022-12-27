import React, { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faX, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import s from './CardH.module.css';


function CardH({id, brand, name, image, price, stock}){
    return(
        <div className={s.card}>
            <div className={s.close}><button className={s.icon}><FontAwesomeIcon icon={faX} /></button></div>
            <div className={s.cardInfo} >
                <div>
                    <Link to={`/detail/${id}`}><img className={s.pImg} src={image} alt={id} /></Link>
                </div>
                <div className={s.pInfo}>
                    <span className={s.pName}>{name}</span>
                    <span className={s.pBrand}>{brand}</span>
                    <div className={s.pStock}>
                        &nbsp;&nbsp;&nbsp;&nbsp; 1 &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <span className={s.pPrice}>US${price}</span>
                </div>
            </div>
        </div>
    )
}

export default CardH;