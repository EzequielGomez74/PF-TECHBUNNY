import React, { useState } from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import validate from "./validate";
import { useHistory, useParams } from "react-router-dom";

function NewPassword() {
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
      <div>
        <h3>Nueva Contraseña</h3>
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
        <button onClick={handlepasswordChange}>Guardar nueva contraseña</button>
      </div>
      <Footer />
    </div>
  );
}

export default NewPassword;
