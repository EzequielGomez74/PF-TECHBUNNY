import React from "react";
// import ReactDOM from "react-dom";
import s from './CardV.module.css';
import { Link } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, } from "react-redux";
import * as actions from '../../redux/actions'


function CardV({product_id, brand, name, image, price, stock, user_id}){

    let dispatch = useDispatch();
    let handleClick = () => {
        if(!user_id){
            alert("NECESITAS INICIAR SESIÓN")
        }else{
            dispatch(actions.addFavorite({user_id, product_id}))
            console.log('ESTOY ENVIANDO', user_id, product_id)
        }
    }

    return(
    <div>
        <div className={s.card}>
            <div className={s.iconWrap}>
                <button className={s.heart} onClick={handleClick}><FontAwesomeIcon icon={faHeart} /></button>
            </div>
            <Link to={`/detail/${product_id}`}><img className={s.img} src={image} alt={product_id} /></Link>
            <p className={s.brand}>{brand}</p>
            <Link to={`/detail/${product_id}`}><p className={s.name}>{name}</p></Link>
            <p className={s.price}>US${price}</p>
        </div>
    </div>
    )
};

export default CardV;