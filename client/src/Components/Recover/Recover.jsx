import React, { useState } from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import img from "../../Photos/conejotriste.png";

function Recover() {
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSendEmail = async () => {
    await axios.put("/enter/recover", { email });
  };

  return (
    <div>
      <NavBar />
      <div className="recoverContainer">
      <div className="imgContainer">
            <div className="imgBunny">
              <img src={img} alt="bunny login"  />
            </div>
            </div>
        <h3>¿Te olvidaste tu contraseña?</h3>
        <h4>
          ¡No te preocupes! Escribe el email de tu cuenta{" "}
          <strong>TECHBUNNY</strong> y recibe las instrucciones para
          recuperarla.{" "}
        </h4>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={handleChange}
        />
        <button onClick={handleSendEmail}>Recuperar contraseña</button>
      </div>
      <Footer />
    </div>
  );
}

export default Recover;
