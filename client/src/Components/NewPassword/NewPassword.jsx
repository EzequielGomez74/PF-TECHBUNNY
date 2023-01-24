import React, { useState } from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import validate from "./validate";
import { useHistory, useParams } from "react-router-dom";
import img from "../../images/recoverpassword.png";
import s from "./NewPassword.module.css";
import { useSelector } from "react-redux";



function NewPassword() {
  const dm = useSelector(state => state.darkMode);
  const { token } = useParams();
  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  // post /recoverPassword body = {token:12312312309123 , password : passingresado}
  const handlepasswordChange = async () => {
    if (input.newPassword === input.confirmPassword) {
      await axios.post("/recoverPassword", {
        password: input.newPassword,
        token,
      });
      alert("Contraseña modificada con exito");
      history.push("/login");
    } else alert("Las contraseñas no coinciden");
  };
  return (
    <div>
      <NavBar />
      <div className={dm ? s.dmnewPasswordContainer : s.newPasswordContainer}>
      <div className={dm ? s.dmdivForm : s.divForm}>
      <div className={dm ? s.dmimgBunny : s.imgBunny}>
            <img src={img} alt="bunny login" />
            </div>
        <h3>Ingrese Nueva Contraseña</h3>
        <div className={dm? s.dmdivInput : s.divInput}>
        <input
          type="password"
          name="newPassword"
          value={input.newPassword}
          placeholder="Nueva contraseña"
          onChange={(e) => handleChange(e)}
        />
        {errors.newPassword && <span>{errors.newPassword}</span>}
        <input
          type="password"
          name="confirmPassword"
          value={input.confirmPassword}
          placeholder="Confirma nueva contraseña"
          onChange={(e) => handleChange(e)}
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        <button className={dm ? s.dmbtnRecover : s.btnRecover} onClick={handlepasswordChange}> <p>Nueva contraseña</p></button>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default NewPassword;
