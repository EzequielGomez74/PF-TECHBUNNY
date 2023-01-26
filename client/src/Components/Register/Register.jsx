import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import s from "./Register.module.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";
import axios from "axios";
import GoogleLoginContainer from "../GoogleLoginContainer/GoogleLoginContainer";
import Control from "./Control";
import img from "../../Photos/bunnylogin.png";
import Swal from "sweetalert2";

function Register() {
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState({});
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
    setErrors(
      Control({
        ...register,
        [e.target.name]: e.target.value,
      })
    );
  };

  const postNewUser = async (user) => {
    try {
      const response = await axios.post("/enter", user);
      //!manejar response
      if (response.data.status === "SUCCESS")
        Swal.fire({
          title: "¡Éxito!",
          text: "Registrado con éxito, te hemos enviado un mail de verificación",
          icon: "success",
          confirmButtonColor: "#d7f136",
        });
      else
        Swal.fire({
          title: "¡Error!",
          text: "Registro fallido",
          icon: "error",
          confirmButtonText: "Volver a intentar",
          confirmButtonColor: "#2B3036",
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Con botón local
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError(true);
    //!PROVISORIO SOLO POR MOTIVOS DE TESTEO EL IF QUEDA EN TRUE -> descomentar linea de abajo para produccion
    if (Object.keys(errors).length === 0) {
    // if (true) {
      postNewUser(register);
    }
  };

  // Pendiente con botón Google

  const history = useHistory();
  const handleClick = () => {
    history.push("/login");
  };
  //dark mode
  const dm = useSelector((state) => state.darkMode);

  return (
    <div className={dm ? s.dmloginPage : s.loginPage}>
      <NavBar />
      <section className={dm ? s.dmloginSection : s.loginSection}>
        <div className={dm ? s.dmheroLogin : s.heroLogin}>
          <div>
            <img src={img} alt="bunny login" className={s.img} />
          </div>
        </div>
        <div className={dm ? s.dmloginCard : s.loginCard}>
          <h4>¡Regístrate!</h4>
          {errors.username && showError ? (
            <span className={s.error}>{errors.username}</span>
          ) : (
            <span className={s.hidden}></span>
          )}
          <input
            type="text"
            name="username"
            value={register.username}
            onChange={handleChange}
            placeholder="Usuario"
          />

          {errors.email && showError ? (
            <span className={s.error}>{errors.email}</span>
          ) : (
            <span className={s.hidden}></span>
          )}
          <input
            type="email"
            name="email"
            value={register.email}
            onChange={handleChange}
            placeholder="Email"
          />

          {errors.password && showError ? (
            <span className={s.error}>{errors.password}</span>
          ) : (
            <span className={s.hidden}></span>
          )}
          <input
            type="password"
            name="password"
            value={register.password}
            onChange={handleChange}
            placeholder="Contraseña"
          />
          <button onClick={handleSubmit} className={dm ? s.dmb1 : s.b1}>
            Registrar
          </button>
          <GoogleLoginContainer />
          <span onClick={handleClick} className={dm ? s.dmm2 : s.m2}>
            ¿Ya tienes cuenta?{" "}
            <strong onClick={handleClick} className={dm ? s.dmlogin : s.login}>
              ¡Ingresa aquí!
            </strong>
          </span>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Register;
