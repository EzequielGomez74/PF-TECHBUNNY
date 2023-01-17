import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import s from './CardH.module.css';
<<<<<<< HEAD
// import { useDispatch } from "react-redux";
import * as actions from '../../redux/actions'
import { useDispatch } from "react-redux";


function CardH({product_id, brand, name, image, price, stock, user_id}){
    let dispatch = useDispatch()
    let handleClick = () => {
        if (!user_id) {
					alert("NO ESTAS LOGUEADO");
				} else {
					console.log(product_id, user_id);
					dispatch(actions.addFavorite({ user_id, product_id }));
					console.log("ESTOY ENVIANDO", user_id, product_id);
				}
    }
    return(
        <div className={s.card}>
            <div className={s.deleteX}><button className={s.icon} onClick={handleClick}  ><FontAwesomeIcon icon={faX} /></button></div>
            <div className={s.cardInfo} >
                <div>
                    <Link to={`/detail/${product_id}`}><img className={s.pImg} src={image} alt={product_id} /></Link>
=======
import { useDispatch } from "react-redux";
import * as actions from '../../redux/actions'


function CardH({id, brand, name, image, price, stock}){
    let dispatch = useDispatch()
    return(
        <div className={s.card}>
            <div className={s.deleteX}><button className={s.icon} onClick={()=> dispatch(actions.removeFavorite(id))} ><FontAwesomeIcon icon={faX} /></button></div>
            <div className={s.cardInfo} >
                <div>
                    <Link to={`/detail/${id}`}><img className={s.pImg} src={image} alt={id} /></Link>
>>>>>>> a81739dcfc51972965136dab2818ec451e6c18ec
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