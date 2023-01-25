import React from "react";
import imgNewsletter from "../../Photos/newsletter.png";
import s from "../NewsLetter/Newsletter.module.css";

function Newsletter() {
  return (
    <div className={s.maincointainer}>
      <div className={s.prueba}>
        <div className={s.imgcontainer}>
          <img
            className={s.imgNewsletter}
            src={imgNewsletter}
            alt="not found"
          />
        </div>
        {/* <div className={s.textandinput}>
          <h2>Suscríbete al Newsletter</h2>
          <input
            type="search"
            className={s.inputText}
            placeholder={`Correo electrónico`}
          />
          <button className={s.inputBtn}>SUSCRIBIRSE</button>
        </div> */}
        <h2 className={s.newsText}>¡Amplia variedad de productos tecnológicos!</h2>
      </div>
    </div>
  );
}

export default Newsletter;
