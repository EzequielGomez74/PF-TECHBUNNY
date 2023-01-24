import React, { useState } from "react";
// import ReactDOM from "react-dom";
import s from "./CardCarrusel.module.css";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import Swal from "sweetalert2";

function CardCarrusel({
  product_id,
  brand,
  name,
  image,
  price,
  favorite,
  user_id,
}) {
  let [active, setActive] = useState(favorite);
  let dispatch = useDispatch();
  let history = useHistory();

  let handleClick = () => {
    if (!user_id) {
      Swal.fire({
        title: "¡Alerta!",
        text: "Para agregar productos a favoritos, necesitas ingresar a tu cuenta.",
        icon: "warning",
        confirmButtonText: "Iniciar sesión",
      }).then((response) => {
        if (response.isConfirmed) history.push("/login");
      });
    } else {
      dispatch(actions.addFavorite({ user_id, product_id }));
      setActive(!active);
    }
  };

  return (
    <div>
      <div className={s.card}>
        <div className={s.iconWrap}>
          <button
            className={active ? s.favHeart : s.heart}
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
        <Link to={`/detail/${product_id}`}>
          <img className={s.img} src={image} alt={product_id} />
        </Link>
        <p className={s.brand}>{brand}</p>
        <Link to={`/detail/${product_id}`}>
          <p className={s.name}>{name}</p>
        </Link>
        <p className={s.price}>US$ {price}</p>
      </div>
    </div>
  );
}

export default CardCarrusel;
