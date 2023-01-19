import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import s from "./Login.module.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import loginUser from "../../scripts/loginUser";
import img from "../../Photos/bunnylogin.png";
import Control from "./Control";
import GoogleLoginContainer from "../GoogleLoginContainer/GoogleLoginContainer";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = () => {
    history.push("/register");
  };
  //dark mode
  const dm = useSelector((state) => state.darkMode);
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState({});
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
    setErrors(
      Control({
        ...login,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleLogin = (e) => {
    setShowError(true);
    //!PROVISORIO SOLO POR MOTIVOS DE TESTEO EL IF QUEDA EN TRUE -> descomentar linea de abajo para produccion
    //if (Object.keys(errors).length === 0) {
    if (true) {
      loginUser(
        {
          username: login.username,
          password: login.password,
        },
        (status) => {
          if (status === "CONTRASEÑA INCORRECTA")
            alert("CONTRASEÑA INCORRECTA");
          else if (status === "MAIL NO VALIDADO") alert("MAIL NO VALIDADO");
          else if (status === "SUCCESS") {
            alert("TE HAS LOGUEADO CON EXITO");
            history.goBack();
          }
        }
      );
    }
    //TODO MANEJAR LOS ERRORES DE CREACION DE FORMULARIO PARA ESTE INPUT
  };

  const handleForgotPassword = () => {
    history.push("/recover");
  };

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
          <input
            type="text"
            name="username"
            value={login.username}
            onChange={handleChange}
            placeholder="Usuario"
          />
          {errors.username && showError ? (
            <span className={s.error}>{errors.username}</span>
          ) : (
            <span className={s.hidden}></span>
          )}
          <input
            type="password"
            name="password"
            value={login.password}
            onChange={handleChange}
            placeholder="Contraseña"
          />
          {errors.password && showError ? (
            <span className={s.error}>{errors.password}</span>
          ) : (
            <span className={s.hidden}></span>
          )}
          <span
            className={dm ? s.dmrecoverPass : s.recoverPass}
            onClick={handleForgotPassword}
          >
            ¿Olvidaste tu contraseña?
          </span>
          <button onClick={handleLogin} className={dm ? s.dmb1 : s.b1}>
            Iniciar Sesión
          </button>
          <GoogleLoginContainer />
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
