<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
=======
import React, { useState } from "react";
>>>>>>> a81739dcfc51972965136dab2818ec451e6c18ec
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import s from "./CartCard.module.css";
<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

function CartCard({ user_id ,product_id, brand, product_name, image, price, stock, count }) {
  const [trigger, setTrigger] = useState(false)
  const cart = useSelector(state => state.cart);
  let loggedUser = useSelector(state => state.loggedUser);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(count);
=======
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";

function CartCard({ id, brand, name, image, price, stock, totalQuantity }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(totalQuantity);
>>>>>>> a81739dcfc51972965136dab2818ec451e6c18ec
  const [total, setTotal] = useState(parseInt(stock));

  const handlePlus = () => {
    if (quantity < total) {
      setQuantity(quantity + 1);
<<<<<<< HEAD
      dispatch(actions.addOrRemoveQuantityFromCart(product_id, -1));
=======
      dispatch(actions.addOrRemoveQuantityFromCart(id, -1));
>>>>>>> a81739dcfc51972965136dab2818ec451e6c18ec
      setTotal(total);
    }
  };

  const handleMinus = () => {
<<<<<<< HEAD
		if (quantity > 0) {
			setQuantity(quantity - 1);
			dispatch(actions.addOrRemoveQuantityFromCart(product_id, 1));
			setTotal(total);
		}
	};


  useEffect(()=>{
    dispatch(actions.allCartByUser(loggedUser.user_id))
  },[trigger])

    return(
        <div className={s.card}>
            <div className={s.deleteX}><button onClick={() => dispatch(actions.removeCart(user_id, product_id, ()=>{
              setTrigger(!trigger)
            }))} className={s.icon}><FontAwesomeIcon icon={faX} /></button></div>
            <div className={s.cardInfo} >
                <div>
                    <Link to={`/detail/${product_id}`}><img className={s.pImg} src={image} alt={product_id} /></Link>
                </div>
                <div className={s.pInfo}>
                    <span className={s.pName}>{product_name}</span>
=======
    if (quantity > 0) {
      setQuantity(quantity - 1);
      dispatch(actions.addOrRemoveQuantityFromCart(id, 1));
      setTotal(total);
    }
  };

    return(
        <div className={s.card}>
            <div className={s.deleteX}><button onClick={() => dispatch(actions.removeCart(id))} className={s.icon}><FontAwesomeIcon icon={faX} /></button></div>
            <div className={s.cardInfo} >
                <div>
                    <Link to={`/detail/${id}`}><img className={s.pImg} src={image} alt={id} /></Link>
                </div>
                <div className={s.pInfo}>
                    <span className={s.pName}>{name}</span>
>>>>>>> a81739dcfc51972965136dab2818ec451e6c18ec
                    <span className={s.pBrand}>{brand}</span>
                    <div className={s.pStock}>
                        <button onClick={handleMinus} ><FontAwesomeIcon icon={faMinus} /></button>
                        &nbsp;&nbsp;&nbsp;&nbsp; {quantity} &nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={handlePlus} ><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                    <span className={s.pPrice}>US${price * quantity}</span>
                </div>
            </div>
        </div>
       
  );
}

export default CartCard;
