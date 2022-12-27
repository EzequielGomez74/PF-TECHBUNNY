import React, { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faX, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import s from './CartCard.module.css'

function CartCard({id, brand, name, image, price, stock, totalQuantity}) {
    const [quantity, setQuantity] = useState(totalQuantity)
    const [total, setTotal] = useState(parseInt(stock))

    const handlePlus = () => {
        if(quantity < total){
            setQuantity(quantity + 1);
            setTotal(total - 1);
        }
    }

    const handleMinus = () => {
        if(quantity > 1){
            setQuantity(quantity - 1);
            setTotal(total + 1);
        }
    }

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
                        <button onClick={handlePlus} ><FontAwesomeIcon icon={faPlus} /></button>
                        &nbsp;&nbsp;&nbsp;&nbsp; {quantity} &nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={handleMinus} ><FontAwesomeIcon icon={faMinus} /></button>
                    </div>
                    <span className={s.pPrice}>US${price * quantity}</span>
                </div>
            </div>
        </div>
    )
}

export default CartCard