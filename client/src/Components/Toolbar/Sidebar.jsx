import React from 'react'
import './Toolbar.css'
// import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faBullhorn, faBox, faUser, faChartSimple } from "@fortawesome/free-solid-svg-icons";

function Sidebar({ SideBar }) {
  return (
    <div className={SideBar ? `sidebar sidebar--open`: `sidebar`}>
      <li><FontAwesomeIcon icon={faChartSimple} /> Dashboard</li>
      <li><FontAwesomeIcon icon={faUser} /> Usuarios</li>
      <li><FontAwesomeIcon icon={faBox} /> Productos</li>
      <li><FontAwesomeIcon icon={faTruck} /> Pedidos</li>
      <li><FontAwesomeIcon icon={faBullhorn} /> Newsletter</li>
    </div>
  )
}

export default Sidebar