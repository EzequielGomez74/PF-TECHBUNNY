import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import s from "./Register.module.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";
import axios from "axios";

function Register() {
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
  };

  const postNewUser = async (user) => {
    try {
      await axios.post("/enter", user);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Con botón local
  const handleSubmit = (e) => {
    e.preventDefault();
    if (register.username && register.password && register.email)
      postNewUser(register);
    console.log(register);
  };

  // Pendiente con botón Google

  const history = useHistory();
  const handleClick = () => {
    history.push("/login");
  };

  //dark mode
  const dm = useSelector((state) => state.darkMode);

  return (
    <div>
      <NavBar />
      <section className={dm ? s.dmloginSection : s.loginSection}>
        <div className={dm ? s.dmheroLogin : s.heroLogin}>
          <div className={dm ? s.dmhero : s.hero}></div>
        </div>
        <div className={dm ? s.dmloginCard : s.loginCard}>
          <h4>¡Regístrate!</h4>
          <input
            type="text"
            name="username"
            value={register.username}
            onChange={handleChange}
            placeholder="Usuario"
          />
          <input
            type="email"
            name="email"
            value={register.email}
            onChange={handleChange}
            placeholder="Email"
          />
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
          <button className={dm ? s.dmb2 : s.b2}>
            <FontAwesomeIcon icon={faGoogle} />
            &nbsp;&nbsp;&nbsp;Registrar con Google
          </button>
          <span onClick={handleClick} className={dm ? s.dmm2 : s.m2}>
            ¿Ya tienes cuenta? <strong>¡Ingresa aquí!</strong>
          </span>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Register;
