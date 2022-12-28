import React from 'react'
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import s from './Register.module.css';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


function Register() {
  const history = useHistory();
  const handleClick = () => {
      history.push('/login');
  }

  return (
    <div>
      <NavBar />
      <section className={s.loginSection}>
        <div className={s.heroLogin}>
          <div className={s.hero}></div>
        </div>
        <div className={s.loginCard}>
          <h4>¡Regístrate!</h4>
          <input type="text" placeholder='Usuario' />
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Contraseña' />
          <button className={s.b1} >Registrar</button>
          <button className={s.b2}><FontAwesomeIcon icon={faGoogle} />&nbsp;&nbsp;&nbsp;Registrar con Google</button>
          <span onClick={handleClick} className={s.m2}>¿Ya tienes cuenta? <strong>¡Ingresa aquí!</strong></span>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Register