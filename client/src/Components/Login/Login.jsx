import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import s from './Login.module.css';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function Login() {
  const history = useHistory();
  const handleClick = () => {
      history.push('/register');
  }
  return (
    <div>
      <NavBar />
      <section className={s.loginSection}>
        <div className={s.heroLogin}>
          <div className={s.hero}></div>
        </div>
        <div className={s.loginCard}>
          <h4>¡Hola! Inicia Sesión</h4>
          <input type="text" placeholder='Usuario' />
          <input type="password" placeholder='Contraseña' />
          <span className={s.m1}>¿Olvidaste tu contraseña?</span>
          <button className={s.b1} >Iniciar Sesión</button>
          <button className={s.b2}><FontAwesomeIcon icon={faGoogle} />&nbsp;&nbsp;&nbsp;Iniciar Sesión con Google</button>
          <span onClick={handleClick} className={s.m2}>¿No tienes cuenta? <strong>¡Regístrate aquí!</strong></span>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Login