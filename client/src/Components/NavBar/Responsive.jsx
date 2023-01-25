import { useState, useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHeart,
  faCartShopping,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import s from "./Responsive.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/actions";
import logoutUser from "../../scripts/logoutUser.js";

const Responsive = () => {
  const [show, setShow] = useState(false);
  const parent = useRef(null);
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.loggedUser);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShow(!show);
  // Para saber cuantos elementos se agregaron a favoritos
  const favs = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);
  const dm = useSelector((state) => state.darkMode);

  return (
    <div ref={parent} className={s.dropdown}>
      <div className={s.menu} onClick={reveal}>
        <FontAwesomeIcon
          className={dm ? s.dmmenuIcon : s.menuIcon}
          name="menu"
          icon={faBars}
        />
      </div>
      {show && (
        <div className={`dropdown-content`}>
          <SearchBar />
          <div className={dm ? s.dmuserItems : s.userItems}>
            <button onClick={() => dispatch(toggleDarkMode())}>
              <FontAwesomeIcon icon={dm ? faSun : faMoon} />
            </button>
            <Link to="/favorites">
              <span>
                <FontAwesomeIcon icon={faHeart} />
                &nbsp;&nbsp; {favs.length}
              </span>
            </Link>
            <Link to="/cart">
              <span>
                <FontAwesomeIcon name="cart" icon={faCartShopping} />
                &nbsp;&nbsp; {cart.length}
              </span>
            </Link>
          </div>
          <div className={dm ? s.dmmenuItems : s.menuItems}>
            <Link to="/home">
              <p>HOME</p>
            </Link>
            <Link to="/about">
              <p>SOBRE TECHBUNNY</p>
            </Link>
            <Link to="/categories">
              <p>CATEGORIAS</p>
            </Link>
            <Link to="/favorites">
              <p>FAVORITOS</p>
            </Link>
            <Link to="/cart">
              <p>CARRITO</p>
            </Link>
            <Link to="/followUp">
              <p>VER ESTADO DE PEDIDO</p>
            </Link>
          </div>

          {!Object.keys(loggedUser).length ? (
            <div className={dm ? s.dmsession : s.session}>
              <Link to="/login">
                <p>Iniciar Sesión</p>
              </Link>
              <Link to="/register">
                <p>Registrarse</p>
              </Link>
            </div>
          ) : (
            <div className={dm ? s.dmsession : s.session}>
              <Link to="/profile">
                <p>Mi perfil</p>
              </Link>
              {loggedUser?.role === 3 && (
                <Link to="/dashboard">
                  <p>Dashboard</p>
                </Link>
              )}
              <Link to="/login">
                <p onClick={() => logoutUser()}>Cerrar sesión</p>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Responsive;
