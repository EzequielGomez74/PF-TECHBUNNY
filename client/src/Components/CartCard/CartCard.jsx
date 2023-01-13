import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import s from "./CartCard.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";

function CartCard({ id, brand, name, image, price, stock, totalQuantity }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(totalQuantity);
  const [total, setTotal] = useState(parseInt(stock));

  const handlePlus = () => {
    if (quantity < total) {
      setQuantity(quantity + 1);
      dispatch(actions.addOrRemoveQuantityFromCart(id, -1));
      setTotal(total);
    }
  };

  const handleMinus = () => {
    if (quantity > 1) {
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
