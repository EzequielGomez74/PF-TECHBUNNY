import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import s from "./CartCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

function CartCard({
  user_id,
  product_id,
  brand,
  product_name,
  image,
  price,
  stock,
  count,
}) {
  const [trigger, setTrigger] = useState(false);
  const cart = useSelector((state) => state.cart);
  let loggedUser = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(count);
  const [total, setTotal] = useState(parseInt(stock));

  const handlePlus = () => {
    if (quantity < total) {
      setQuantity(quantity + 1);
      //dispatch(actions.addOrRemoveQuantityFromCart(product_id, -1)); // !
      dispatch(
        actions.addCart(
          {
            product_id,
            product_name,
            price,
            count: 1,
          },
          user_id
        )
      );
      setTotal(total);
    }
  };

  const handleMinus = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      dispatch(
        actions.addCart(
          {
            product_id,
            product_name,
            price,
            count: -1,
          },
          user_id
        )
      );
      setTotal(total);
      //setTrigger(!trigger);
    }
  };

  useEffect(() => {
    dispatch(actions.allCartByUser(loggedUser.user_id));
  }, [trigger]);

  return (
    <div className={s.card}>
      <div className={s.deleteX}>
        <button
          onClick={() =>
            dispatch(
              actions.removeCart(user_id, product_id, () => {
                setTrigger(!trigger);
              })
            )
          }
          className={s.icon}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      <div className={s.cardInfo}>
        <div>
          <Link to={`/detail/${product_id}`}>
            <img className={s.pImg} src={image} alt={product_id} />
          </Link>
        </div>
        <div className={s.pInfo}>
          <span className={s.pName}>{product_name}</span>
          <span className={s.pBrand}>{brand}</span>
          <div className={s.pStock}>
            <button onClick={handleMinus}>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp; {quantity} &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={handlePlus}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <span className={s.pPrice}>US$ {(price * quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
