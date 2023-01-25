import React from "react";
import "./Toolbar.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faBullhorn,
  faBox,
  faUser,
  faChartSimple,
  faHouse,
  faChartColumn
} from "@fortawesome/free-solid-svg-icons";

function Sidebar({ SideBar }) {
  return (
    <div className={SideBar ? `sidebar sidebar--open` : `sidebar`}>
      <NavLink className="sidebarNavLink" to="/dashboard">
        <li>
          <FontAwesomeIcon icon={faChartSimple} /> Dashboard
        </li>
      </NavLink>
      <NavLink className="sidebarNavLink" to="/dashboard/users">
        <li>
          <FontAwesomeIcon icon={faUser} /> Usuarios
        </li>
      </NavLink>
      <NavLink className="sidebarNavLink" to="/dashboard/products">
        <li>
          <FontAwesomeIcon icon={faBox} /> Productos
        </li>
      </NavLink>
      <NavLink className="sidebarNavLink" to="/dashboard/orders">
        <li>
          <FontAwesomeIcon icon={faTruck} /> Pedidos
        </li>
      </NavLink>
      {/* <NavLink className="sidebarNavLink" to="/dashboard/newletters">
        <li>
          <FontAwesomeIcon icon={faBullhorn} /> Newsletter
        </li>
      </NavLink>
      <NavLink className="sidebarNavLink" to="/dashboard/statistics">
        <li>
          <FontAwesomeIcon icon={faChartColumn} /> Statistics
        </li>
      </NavLink> */}
      <NavLink className="sidebarNavLink" to="/home">
        <li>
          <FontAwesomeIcon icon={faHouse} /> Volver al inicio
        </li>
      </NavLink>
    </div>
  );
}

export default Sidebar;
