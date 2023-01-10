import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import s from './Login.module.css';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useSelector } from "react-redux";
import Control from './Control';
import img from '../../Photos/bunnylogin.png'

function Login() {
  const [login, setLogin] = useState({
    username:'',
    password: ''
  })
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const handleClick = () => {
      history.push('/register');
  }

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
    setErrors(Control({
      ...login,
      [e.target.name]: e.target.value
    }))
  }

    //dark mode
    const dm = useSelector(state => state.darkMode);

  return (
    <div>
      <NavBar />
      <section className={dm ? s.dmloginSection : s.loginSection}>
        <div className={dm ? s.dmheroLogin : s.heroLogin}>
          <div>
            <img src={img} alt="bunny login" className={dm ? s.dmimg : s.img} />
          </div>
        </div>
        <div className={dm ? s.dmloginCard : s.loginCard}>
          <h4>¡Hola! Inicia Sesión</h4>
          <input type="text" name='username' value={login.username} onChange={handleChange} placeholder='Usuario' />
          {errors.username && (<span>{errors.username}</span>)}
          <input type="password" name='password' value={login.password} onChange={handleChange} placeholder='Contraseña' />
          {errors.password && (<span>{errors.password}</span>)}
          <span className={dm ? s.dmm1 : s.m1}>¿Olvidaste tu contraseña?</span>
          <button className={dm ? s.dmb1 : s.b1} >Iniciar Sesión</button>
          <button className={dm ? s.dmb2 : s.b2}><FontAwesomeIcon icon={faGoogle} />&nbsp;&nbsp;&nbsp;Iniciar Sesión con Google</button>
          <span onClick={handleClick} className={dm ? s.dmm2 : s.m2}>¿No tienes cuenta? <strong>¡Regístrate aquí!</strong></span>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Login