import React from "react";
import s from "./NavBar.module.css";
import SearchBar from "./SearchBar";
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faHeart,
  faCartShopping,
  faUser,
  faCaretDown,
  faAngleDown,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import { useState, useEffect, useRef } from "react";

function NavBar() {
  const [open, setOpen] = useState(false);
  const [openCat, setOpenCat] = useState(false);

  let menuRef = useRef();
  console.log(menuRef.current);
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
      if (!menuRef.current.contains(e.target)) {
        setOpenCat(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

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
            <span>
              <FontAwesomeIcon icon={faHeart} />
              &nbsp;&nbsp; 0
            </span>
            <span>
              <FontAwesomeIcon name="cart" icon={faCartShopping} />
              &nbsp;&nbsp; 0
            </span>
            <span>
              <FontAwesomeIcon icon={faUser} />
              &nbsp;&nbsp;
              <FontAwesomeIcon
                onClick={() => {
                  setOpen(!open);
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
          <p>
            CATEGORIAS &nbsp;&nbsp;
            <FontAwesomeIcon
              onClick={() => {
                setOpenCat(!openCat);
              }}
              icon={faAngleDown}
            />
          </p>
          <p>VER ESTADO DE PEDIDO</p>
        </div>
      </section>
      {/* CATEGORIA DROPDOWN */}
      <div className={`dropdown-menu-cat ${openCat ? "active" : "inactive"}`}>
        <ul>
          <DropdownItemCat text={"Equipos armados"} />
          <DropdownItemCat text={"Consolas"} />
          <DropdownItemCat text={"Notebooks"} />
          <DropdownItemCat text={"Gabinetes"} />
          <DropdownItemCat text={"Fuentes y UPS"} />
          <DropdownItemCat text={"Motherboards"} />
          <DropdownItemCat text={"Procesadores"} />
          <DropdownItemCat text={"Cooling"} />
        </ul>
        <ul>
          <DropdownItemCat text={"Memorias"} />
          <DropdownItemCat text={"Almacenamiento"} />
          <DropdownItemCat text={"Tarjetas de video"} />
          <DropdownItemCat text={"Periféricos"} />
          <DropdownItemCat text={"Monitores y TV"} />
          <DropdownItemCat text={"Sillas"} />
          <DropdownItemCat text={"Pendrives"} />
          <DropdownItemCat text={"Impresoras"} />
        </ul>
      </div>

      <section className={s.three}>
        <div>
          <p>Monitores</p>
          <p>Teclados</p>
          <p>Auriculares</p>
          <p>Mouse</p>
          <p>Parlantes</p>
          <p>Sillas</p>
          <p>Consolas</p>
          <p>Notebooks</p>
          <p>Fuentes</p>
          <p>Procesadores</p>
          <p>Impresoras</p>
          <p>Discos</p>
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
      <img src={props.img}></img>
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
