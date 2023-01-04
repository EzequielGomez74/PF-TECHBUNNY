<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react';
import autoAnimate from '@formkit/auto-animate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHeart, faCartShopping, faMoon, faSun} from '@fortawesome/free-solid-svg-icons';
import s from './Responsive.module.css';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/actions';

const Responsive = () => {

  const [show, setShow] = useState(false)
  const parent = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const reveal = () => setShow(!show)
    // Para saber cuantos elementos se agregaron a favoritos
    const favs = useSelector(state => state.favorites)
    const cart = useSelector(state => state.cart)
    const dm = useSelector(state => state.darkMode)
    
    const results = useSelector(state => state.results)

  return <div ref={parent} className={s.dropdown}>
    <div className={s.menu} onClick={reveal}>
        <FontAwesomeIcon className={dm ? s.dmmenuIcon : s.menuIcon} name='menu' icon={faBars} />
    </div>
    { show && 
    <div className={`dropdown-content`} >
       

       
        <div className={dm ? s.dmuserItems : s.userItems}>
            <button onClick={()=> dispatch(toggleDarkMode())} ><FontAwesomeIcon icon={dm ? faSun : faMoon} /></button>
            <Link to='/favorites'><span><FontAwesomeIcon icon={faHeart} />&nbsp;&nbsp; {favs.length}</span></Link>
            <Link to='/cart'><span><FontAwesomeIcon name='cart' icon={faCartShopping} />&nbsp;&nbsp; {cart.length}</span></Link>
        </div>
        <div className={dm? s.dmmenuItems : s.menuItems}>
            <Link to='/home' ><p>HOME</p></Link>
            <Link to='/about' ><p>SOBRE TECHBUNNY</p></Link>
            <Link to='/categories' ><p>CATEGORIAS</p></Link>
            <Link to='/favorites' ><p>FAVORITOS</p></Link>
            <Link to='/cart' ><p>CARRITO</p></Link>
            <p>VER ESTADO DE PEDIDO</p>
        </div>
        <div className={dm? s.dmsession :s.session} >
            <Link to='/login'><p>Inicar Sesión</p></Link>
            <Link to='/register'><p>Registrarse</p></Link>
        </div>
    </div> }
  </div>
}

export default Responsive

          {/* <div className={s.logo}>
=======
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
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/actions";

const Responsive = () => {
  const [show, setShow] = useState(false);
  const parent = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShow(!show);
  // Para saber cuantos elementos se agregaron a favoritos
  const favs = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);
  const dm = useSelector((state) => state.darkMode);

  const results = useSelector((state) => state.results);

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
            <p>VER ESTADO DE PEDIDO</p>
          </div>
          <div className={dm ? s.dmsession : s.session}>
            <Link to="/login">
              <p>Inicar Sesión</p>
            </Link>
            <Link to="/register">
              <p>Registrarse</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Responsive;

{
  /* <div className={s.logo}>
>>>>>>> fdf4d407383cdabab393c3615932d12381e54a8f
            <h4>TECHBUNNY</h4>
          </div>
          <nav>
            <ul className={s.menuItems}>
              <li>HOME</li>
              <li>SOBRE TECHBUNNY</li>
              <li>CATEGORIAS</li>
              <li>VER ESTADO DE PEDIDO</li>
            </ul>
          </nav>
          <FontAwesomeIcon name='cart' icon={faCartShopping} />
<<<<<<< HEAD
        */}
=======
        */
}
>>>>>>> fdf4d407383cdabab393c3615932d12381e54a8f
