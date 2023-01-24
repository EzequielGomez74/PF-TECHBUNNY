import React from "react";
import s from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faHeart,
  faCartShopping,
  faUser,
  faCaretDown,
  faRightToBracket,
  faUserPlus,
  faSun,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode, setLoggedUser } from "../../redux/actions";
import Responsive from "./Responsive";
import SearchBar from "../SearchBar/SearchBar";
import logo from "../../Photos/loguito.png";
import axios from "axios";
import logoutUser from "../../scripts/logoutUser.js";
import * as actions from "../../redux/actions";

function NavBar() {
  // Para saber cuantos elementos se agregaron a favoritos
  const favs = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);
  const loggedUser = useSelector((state) => state.loggedUser);
  const results = useSelector((state) => state.results);
  //dark mode
  const dm = useSelector((state) => state.darkMode);
  const DM = useSelector((state) => state.darkMode);

  const [searchTerm, setSearchTerm] = useState("");
  //para manejar el dropdown
  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(true);
  const [openCat, setOpenCat] = useState(false);
  const [closedCat, setClosedCat] = useState(true);

  let menuRef = useRef();
  let favsChange = useRef(favs);
  let [prueba, setPrueba] = useState(0);

  //Para que al recargar la pagina no se borre la cantidad de favoritos.
  useEffect(() => {
    if (loggedUser.user_id) {
      dispatch(actions.allFavoritesByUser(loggedUser.user_id));
      dispatch(actions.allCartByUser(loggedUser.user_id));
    }
  }, [loggedUser]);

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
        setClosed(false);
        setOpenCat(false);
        setClosedCat(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  let dispatch = useDispatch();

  return (
    <div className={s.navBar}>
      <section className={dm ? s.dmnavResponsive : s.navResponsive}>
        <h4>TECHBUNNY</h4>
        <Responsive />
      </section>
      <section className={DM ? s.DMone : s.one}>
        <div>
          <div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <h1>
            <a href="#">TECHBUNNY </a>
          </h1>
          <img src={logo} alt="logo" className="logo" />

          <div className={s.navDetail}>
            <button
              className={DM ? s.DMbtnMoon : s.btnMoon}
              onClick={() => dispatch(toggleDarkMode())}
            >
              <FontAwesomeIcon icon={dm ? faSun : faMoon} />
            </button>

            {/* modificarlo por un alert + redirección */}
            <Link to={loggedUser.user_id ? "/favorites" : "/login"}>
              <span className={DM ? s.DMiconsbtn : s.iconsbtn}>
                <FontAwesomeIcon icon={faHeart} />
                &nbsp;&nbsp; {loggedUser.user_id ? favs.length : 0}
              </span>
            </Link>

            <Link to={loggedUser.user_id ? "/cart" : "/login"}>
              <span className={DM ? s.DMiconsbtn : s.iconsbtn}>
                <FontAwesomeIcon name="cart" icon={faCartShopping} />
                &nbsp;&nbsp; {loggedUser.user_id ? cart.length : 0}
              </span>
            </Link>

            {!Object.keys(loggedUser).length ? (
              <span
                className={DM ? s.DMiconsbtn : s.iconsbtn}
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <FontAwesomeIcon icon={faUser} />
                &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCaretDown} />
              </span>
            ) : (
              <span
                className={DM ? s.DMiconsbtn : s.iconsbtn}
                onClick={() => {
                  setOpen(!open);
                }}
              >
                <img
                  className={s.profilePicture}
                  src={loggedUser.profilePicture}
                  alt=""
                />{" "}
              </span>
            )}
          </div>
        </div>
      </section>
      <section className={DM ? s.DMtwo : s.two}>
        <div>
          <Link to="/home">
            <p>HOME</p>
          </Link>
          <Link to="/about">
            <p>SOBRE TECHBUNNY</p>
          </Link>
          <p
            // onMouseOver={() => {
            //   setOpenCat(!openCat);
            // }}
            // onMouseOut={() => {
            //   setOpenCat(!closedCat);
            // }}
            onClick={() => {
              setOpenCat(!openCat);
            }}
          >
            CATEGORIAS<FontAwesomeIcon icon={faCaretDown} />
          </p>
          <Link to="/followUp">
            <p>VER ESTADO DE PEDIDO</p>
          </Link>
        </div>
      </section>
      {/* CATEGORIA DROPDOWN WEB*/}
      <div
        className={`dropdown-menu-cat ${openCat ? "active" : "inactive"}`}
       
      >
        <ul>
          <Link to="/category/Equipos%20armados">
            {" "}
            <DropdownItemCat text={"Equipos armados"} />
          </Link>
          <Link to="/category/Consolas">
            {" "}
            <DropdownItemCat text={"Consolas"} />
          </Link>
          <Link to="/category/Notebooks">
            {" "}
            <DropdownItemCat text={"Notebooks"} />
          </Link>
          <Link to="/category/Gabinetes">
            {" "}
            <DropdownItemCat text={"Gabinetes"} />
          </Link>
          <Link to="/category/Fuentes%20y%20UPS">
            {" "}
            <DropdownItemCat text={"Fuentes y UPS"} />
          </Link>
          <Link to="/category/Motherboards">
            {" "}
            <DropdownItemCat text={"Motherboards"} />
          </Link>
          <Link to="/category/Procesadores">
            {" "}
            <DropdownItemCat text={"Procesadores"} />
          </Link>
          <Link to="/category/Cooling">
            {" "}
            <DropdownItemCat text={"Cooling"} />
          </Link>
        </ul>
        <ul>
          <Link to="/category/Memorias">
            {" "}
            <DropdownItemCat text={"Memorias"} />
          </Link>
          <Link to="/category/Almacenamiento">
            {" "}
            <DropdownItemCat text={"Almacenamiento"} />
          </Link>
          <Link to="/category/Tarjetas%20de%20video">
            {" "}
            <DropdownItemCat text={"Tarjetas de video"} />
          </Link>
          <Link to="/category/Periféricos">
            {" "}
            <DropdownItemCat text={"Periféricos"} />
          </Link>
          <Link to="/category/Monitores%20y%20TV">
            {" "}
            <DropdownItemCat text={"Monitores y TV"} />
          </Link>
          <Link to="/category/Sillas">
            {" "}
            <DropdownItemCat text={"Sillas"} />
          </Link>
          <Link to="/category/Pendrives">
            {" "}
            <DropdownItemCat text={"Pendrives"} />
          </Link>
          <Link to="/category/Impresoras">
            {" "}
            <DropdownItemCat text={"Impresoras"} />
          </Link>
        </ul>
      </div>

      <section className={DM ? s.DMthree : s.three}>
        <div>
          <Link to="/category/Monitores%20y%20TV">
            <p>Monitores</p>{" "}
          </Link>
          <Link to="/category/Periféricos">
            {" "}
            <p>Periféricos</p>
          </Link>
          <Link to="/category/Memorias">
            {" "}
            <p>Memorias</p>
          </Link>
          <Link to="/category/Pendrives">
            {" "}
            <p>Pendrives</p>{" "}
          </Link>
          <Link to="/category/Notebooks">
            {" "}
            <p>Notebooks</p>
          </Link>
          <Link to="/category/Consolas">
            {" "}
            <p>Consolas</p>
          </Link>
          <Link to="/category/Gabinetes">
            {" "}
            <p>Gabinetes</p>
          </Link>
          <Link to="/category/Motherboards">
            {" "}
            <p>Motherboards</p>
          </Link>
          <Link to="/category/Procesadores">
            {" "}
            <p>Procesadores</p>
          </Link>
          <Link to="/category/Cooling">
            {" "}
            <p>Cooling</p>
          </Link>
        </div>
      </section>

      {/* USUARIO REGISTRADO */}
      {/* <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
                    <h3>NOMBRE USUARIO</h3>
                    <span>Bienvenido/a a TECHBUNNY</span>
                    <ul>
                        <DropdownItem icon = {faUser} text={"My Profile"}/>
                        <DropdownItem icon = {faRightFromBracket} text={"Log Out"}/>
                    </ul>
        </div> */}

      {/* INVITADO */}
      {!Object.keys(loggedUser).length ? (
        <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          <h3>INICIA SESIÓN</h3>
          <span>Para una mejor experiencia</span>
          <ul>
            <Link to="/login">
              <DropdownItem icon={faRightToBracket} text={"Log In"} />
            </Link>

            <Link to="/register">
              <DropdownItem icon={faUserPlus} text={"Register"} />
            </Link>
          </ul>
        </div>
      ) : (
        <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          <h3>BIENVENID@ {loggedUser.username}</h3>
          <span>Gracias por confiar en TECHBUNNY</span>
          <ul>
            <Link to="/profile">
              <DropdownItem icon={faRightToBracket} text={"Mi perfil"} />
            </Link>
            {loggedUser?.role === 3 && (
              <Link to="/dashboard">
                <DropdownItem
                 
                  icon={faScrewdriverWrench}
                  text={"Dashboard"}
                />
              </Link>
            )}

            <Link to="/login" onClick={() => logoutUser()}>
              <DropdownItem icon={faRightToBracket} text={"Log Out"} />
            </Link>
          </ul>
        </div>
      )}

      <div className="search1">
        {searchTerm.length && results.length
          ? results.map((p, i) => {
              if (i < 7)
                return (
                  <div className="hola123">
                    <Link to={`/detail/${p.product_id}`}>
                      {" "}
                      <img className="imgsearch" src={p.image} alt={p.name} />
                    </Link>
                    <Link to={`/detail/${p.product_id}`}>
                      {" "}
                      <span className="NameSearch"> {p.name} </span>{" "}
                    </Link>
                  </div>
                );
            })
          : null}
      </div>
    </div>
  );
}

function DropdownItem(props) {
  return (
    <li className={s.dropdownItem}>
      {/* <img src={props.img}></img> */}
      <FontAwesomeIcon icon={props.icon} />
      <a>{props.text}</a>
    </li>
  );
}

function DropdownItemCat(props) {
  return (
    <li className={s.dropdownItem}>
      <a>{props.text}</a>
    </li>
  );
}

export default NavBar;
