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
import Swal from "sweetalert2";

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
            Swal.fire({
              title: "¡Error!",
              text: "Contraseña incorrecta",
              icon: "error",
              confirmButtonColor: "#2B3036",
            });
          else if (status === "MAIL NO VALIDADO")
            Swal.fire({
              title: "¡Error!",
              text: "Correo electrónico no validado",
              icon: "error",
              confirmButtonColor: "#2B3036",
            });
          else if (status === "CUENTA DESHABILITADA")
            Swal.fire({
              title: "¡Alerta!",
              text: "Tu cuenta ha sido deshabilitada",
              icon: "warning",
              confirmButtonColor: "#2B3036",
            });
          else if (status === "SUCCESS") {
            Swal.fire({
              title: "¡Éxito!",
              text: "Logueado con éxito",
              icon: "success",
              confirmButtonColor: "#d7f136",
            });
            const route = sessionStorage.getItem("route");
            if (route && route.includes("/verify/")) {
              console.log("entre al primero");
              history.push("/home");
              sessionStorage.setItem("route", "");
            } else {
              console.log("entre al segundo");
              history.goBack();
            }
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
    <div className={dm ? s.dmloginPage : s.loginPage}>
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
            <br />
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
            <span className={dm ? s.dmhidden : s.hidden}>.</span>
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
          <span className={dm ? s.dmm2 : s.m2}>
            ¿No tienes cuenta?{" "}
            <strong
              onClick={handleClick}
              className={dm ? s.dmregister : s.register}
            >
              ¡Regístrate aquí!
            </strong>
          </span>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Login;