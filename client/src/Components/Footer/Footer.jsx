import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faBoxOpen, faBox, faTruckRampBox, faBagShopping, faListCheck, faPhoneVolume, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import s from './Footer.module.css';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

function Footer() {

  //dark mode
  const dm = useSelector(state => state.darkMode);

  return (
    <div className={s.footer}>
      <section className={s.main}>
        {/* Maquetado completo. Falta linkear las preguntas frecuentes */}
        <div>
          <h3>SOPORTE</h3>
          <Link to='/qa'><p><FontAwesomeIcon icon={faComments} /> &nbsp;&nbsp;Preguntas frecuentes</p></Link>
          <Link to='/qa'><p><FontAwesomeIcon icon={faBox} /> &nbsp;&nbsp; Política de cambios</p></Link>
          <Link to='/qa'><p><FontAwesomeIcon icon={faBoxOpen} /> &nbsp;&nbsp;Política de devoluciones</p></Link>
        </div>
        <div>
          <h3>SERVICIOS</h3>
          <p><FontAwesomeIcon icon={faTruckRampBox} /> &nbsp;&nbsp; Envío gratis</p>
          <p><FontAwesomeIcon icon={faBagShopping} /> &nbsp;&nbsp; Pago a través de Mercado Pago</p>
          <Link to='/followUp'><p><FontAwesomeIcon icon={faListCheck} /> &nbsp;&nbsp; Verificación de Estado de Pedido</p></Link>
        </div>
        <div>
          <h3>CONTACTO</h3>
          <p><FontAwesomeIcon icon={faPhoneVolume} /> &nbsp;&nbsp; +54 998 844 022</p>
          <p><FontAwesomeIcon icon={faEnvelope} /> &nbsp;&nbsp; contacto@techbunny.com</p>
          <p><FontAwesomeIcon icon={faLocationDot} /> &nbsp;&nbsp; Argentina | Uruguay | Perú</p>
        </div>
      </section>
      <section className={s.second}>
        <p>© TODOS LOS DERECHOS RESERVADOS  |  TECHBUNNY.COM</p>
      </section>
    </div>
  )
}

export default Footer

