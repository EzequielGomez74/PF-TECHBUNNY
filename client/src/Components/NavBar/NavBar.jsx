import React from "react";
import s from "./NavBar.module.css";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faHeart,
  faCartShopping,
  faUser,
  faCaretDown,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
  //para manejar el dropdown
  const [open, setOpen] = useState(false);
  const [closed, setClosed] = useState(true);
  const [openCat, setOpenCat] = useState(false);
  const [closedCat, setClosedCat] = useState(true);

  useEffect(() => {
    let handler = (e) => {
      {
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

  // Para saber cuantos elementos se agregaron a favoritos
  const favs = useSelector((state) => state.favorites);
  const cart = useSelector((state) => state.cart);

  return (
    <div className={s.navBar}>
      <section className={s.one}>
        <div>
          <SearchBar />
          <h1>
            <a href="/home">TECHBUNNY</a>
          </h1>
          <div className={s.navDetail}>
            <span>
              <FontAwesomeIcon icon={faMoon} />
            </span>
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
            <span>
              <FontAwesomeIcon icon={faUser} />
              &nbsp;&nbsp;
              <FontAwesomeIcon
                onClick={() => {
                  setOpen(!open);
                }}
                onMouseOut={() => {
                  setOpen(!closed);
                }}
                icon={faCaretDown}
              />
            </span>
          </div>
        </div>
      </section>
      <section className={s.two}>
        <div>
          <p>
            <a href="/home">HOME</a>{" "}
          </p>
          <p>
            <a href="/about">SOBRE TECHBUNNY</a>
          </p>
          <p
            onMouseOver={() => {
              setOpenCat(!openCat);
            }}
            onMouseOut={() => {
              setOpenCat(!closedCat);
            }}
          >
            CATEGORIAS
          </p>
          <p>
            <a href="/followUp">VER ESTADO DE PEDIDO</a>
          </p>
        </div>
      </section>
      {/* CATEGORIA DROPDOWN */}
      <div
        className={`dropdown-menu-cat ${openCat ? "active" : "inactive"}`}
        onMouseEnter={() => {
          setOpenCat(!openCat);
        }}
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

      <section className={s.three}>
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
      <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
        <h3>INICIA SESIÓN</h3>
        <span>Para una mejor experiencia</span>
        <ul>
          <DropdownItem icon={faRightToBracket} text={"Log In"} />
          <DropdownItem icon={faUserPlus} text={"Check In"} />
        </ul>
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
