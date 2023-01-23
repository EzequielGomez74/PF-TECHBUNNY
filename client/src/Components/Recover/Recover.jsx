import React, { useState } from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import img from "../../Photos/conejotriste.png";
import s from "../Recover/Recover.module.css";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

function Recover() {
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSendEmail = async () => {
    Swal.fire({
      title: 'MAIL ENVIADO!',
      icon: 'success',
      showConfirmButton: false,
  })
    await axios.put("/enter/recover", { email });
  };

  const dm = useSelector(state => state.darkMode);

  return (
    <div>
      <NavBar />
      <div className={dm ? s.dmrecoverContainer : s.recoverContainer}>
        <form>
          <div className={dm ? s.dmdivForm : s.divForm}>
            <h3>¿Te olvidaste tu contraseña?</h3>
            <div className={dm ? s.dmimgBunny : s.imgBunny}>
            <img src={img} alt="bunny login" />
            </div>
            <h5>
              ¡No te preocupes! Escribe el email de tu cuenta{" "}
              <strong>TECHBUNNY</strong> <br/> y recibe las instrucciones para
              recuperarla.{" "}
            </h5>
            <div className={dm? s.dmdivInput : s.divInput}>
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={handleChange}
            />
            <div className={dm? s.dmdivBtnRecover : s.divBtnRecover}>
            <button className={dm? s.dmbtnRecover : s.btnRecover}onClick={handleSendEmail}><p>Recuperar contraseña</p></button>
            </div>
            
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Recover;
