import React, { useEffect, useState } from "react";
import s from "./Payment.module.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import {
  getPayPreferencesById,
  updateOrderInfoById,
  allOrdersByUser,
} from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { useRef } from "react";
import Control from "./Control";

function Payment() {
  const dm = useSelector((state) => state.darkMode);
  const preferences = useSelector((state) => state.preferences);
  const user = useSelector((state) => state.loggedUser);
  const orderMp = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCart = () => {
    history.push("/cart");
  };

  const [payInfo, setPayInfo] = useState({
    user_id: user.user_id,
    name: "",
    surname: "",
    email: "",
    shippingAddress: "",
    city: "",
    zipCode: "",
    preference_id: "",
  });
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setPayInfo({
      ...payInfo,
      [e.target.name]: e.target.value,
    });
    setErrors(
      Control({
        ...payInfo,
        [e.target.name]: e.target.value,
      })
    );
  };
  const flag = useRef(true);
  useEffect(() => {
    console.log("2v");
    if (Object.keys(preferences).length !== 0 && flag.current) {
      flag.current = false;
      setPayInfo({ ...payInfo, preference_id: preferences.preferenceId });
      console.log("setpayinfo 2", payInfo);

      var script = document.createElement("script");

      // The source domain must be completed according to the site for which you are 	integrating.
      // For example: for Argentina ".com.ar" or for Brazil ".com.br".
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.type = "text/javascript";
      script.dataset.preferenceId = preferences.preferenceId;
      document.getElementById("page-content").innerHTML = "";
      document.querySelector("#page-content").appendChild(script);
      return;
    }
    console.log("1v");
    console.log("setpayinfo 1", payInfo);
    dispatch(updateOrderInfoById(orderMp[0].order_id, payInfo));
  }, [preferences, payInfo.preference_id]);

  async function pay() {
    console.log(Object.keys(errors));
    try {
      setShowError(true);
      if (Object.keys(errors).length === 0) {
        console.log("Entre a dispatch pay");
        dispatch(getPayPreferencesById(orderMp[0].order_id));
        //dispatch(updateOrderInfoById(orderMp[0].order_id, payInfo));
        //dispatch(allOrdersByUser(user.user_id))
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className={dm ? s.dmpayPage : s.payPage}>
      <NavBar />
      <section className={dm ? s.dmpayment : s.payment}>
        <div className={dm ? s.dmpayInfo : s.payInfo}>
          <h2>Pago</h2>
          <div className={dm ? s.dmallInfo : s.allInfo}>
            <div className={dm ? s.dmrequired : s.required}>
              <label>Datos personales</label>
              <input
                type="text"
                name="name"
                value={payInfo.name}
                onChange={handleChange}
                placeholder="Nombre"
              />
              {errors.name && showError ? (
                <span className={s.error}>{errors.name}</span>
              ) : (
                <br />
              )}
              <input
                type="text"
                name="surname"
                value={payInfo.surname}
                onChange={handleChange}
                placeholder="Apellido"
              />
              {errors.surname && showError ? (
                <span className={s.error}>{errors.surname}</span>
              ) : (
                <br />
              )}
              <input
                type="text"
                name="email"
                value={payInfo.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
              />
              {errors.email && showError ? (
                <span className={s.error}>{errors.email}</span>
              ) : (
                <br />
              )}
            </div>
            <div className={dm ? s.dmoptional : s.optional}>
              <label>Ubicación</label>
              <input
                type="text"
                name="shippingAddress"
                value={payInfo.shippingAddress}
                onChange={handleChange}
                placeholder="Dirección"
              />
              {errors.shippingAddress && showError ? (
                <span className={s.error}>{errors.shippingAddress}</span>
              ) : (
                <br />
              )}
              <input
                type="text"
                name="city"
                value={payInfo.city}
                onChange={handleChange}
                placeholder="Ciudad"
              />
              {errors.city && showError ? (
                <span className={s.error}>{errors.city}</span>
              ) : (
                <br />
              )}
              <input
                type="text"
                name="zipCode"
                value={payInfo.zipCode}
                onChange={handleChange}
                placeholder="Código Zip"
              />
              {errors.zipCode && showError ? (
                <span className={s.error}>{errors.zipCode}</span>
              ) : (
                <br />
              )}
            </div>
          </div>
          <div className={dm ? s.dmbuttons : s.buttons}>
            {payInfo.name === "" &&
            payInfo.surname === "" &&
            payInfo.email === "" &&
            payInfo.shippingAddress === "" &&
            payInfo.city === "" &&
            payInfo.zipCode === "" ? (
              <button className={dm ? s.dmb2Disabled : s.b2Disabled}>
                Confirmar Datos
              </button>
            ) : (
              <button onClick={pay} className={dm ? s.dmb2 : s.b2}>
                Confirmar Datos
              </button>
            )}

            <div
              className={dm ? s.dmpageContent : s.pageContent}
              id="page-content"
            ></div>
            {/* Los llevará a Mercado Pago */}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Payment;
