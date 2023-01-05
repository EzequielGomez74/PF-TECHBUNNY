import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import s from "./Login.module.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { getLoginUser } from "../../redux/actions";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = () => {
    history.push("/register");
  };

  //dark mode
  const dm = useSelector((state) => state.darkMode);

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    dispatch(
      getLoginUser({
        username: login.username,
        password: login.password,
      })
    );
  };

  return (
    <div>
      <NavBar />
      <section className={dm ? s.dmloginSection : s.loginSection}>
        <div className={dm ? s.dmheroLogin : s.heroLogin}>
          <div className={dm ? s.dmhero : s.hero}></div>
        </div>
        <div className={dm ? s.dmloginCard : s.loginCard}>
          <h4>¡Hola! Inicia Sesión</h4>
          <input
            type="text"
            name="username"
            value={login.username}
            onChange={handleChange}
            placeholder="Usuario"
          />
          <input
            type="password"
            name="password"
            value={login.password}
            onChange={handleChange}
            placeholder="Contraseña"
          />
          <span className={dm ? s.dmm1 : s.m1}>¿Olvidaste tu contraseña?</span>
          <button onClick={handleLogin} className={dm ? s.dmb1 : s.b1}>
            Iniciar Sesión
          </button>
          <button className={dm ? s.dmb2 : s.b2}>
            <FontAwesomeIcon icon={faGoogle} />
            &nbsp;&nbsp;&nbsp;Iniciar Sesión con Google
          </button>
          <span onClick={handleClick} className={dm ? s.dmm2 : s.m2}>
            ¿No tienes cuenta? <strong>¡Regístrate aquí!</strong>
          </span>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Login;
