import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import s from "./Login.module.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import loginUser from "../../scripts/loginUser";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const clientId =
    "359312154823-68i39m2gfa3fur10gbvcoutohieia5p5.apps.googleusercontent.com";

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

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
    loginUser({
      username: login.username,
      password: login.password,
    });
  };

  async function responseGoogle(response) {
    console.log(response);
    if (response?.tokenId) {
      //mandar al back
      loginUser({ tokenId: response.tokenId });
    } else {
      throw new Error("Google login error");
    }
  }

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
            <GoogleLogin
              clientId={clientId}
              buttonText="login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
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
