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
  });

  const handleChange = (e) => {
    setPayInfo({
      ...payInfo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (Object.keys(preferences).length !== 0) {
      var script = document.createElement("script");

      // The source domain must be completed according to the site for which you are 	integrating.
      // For example: for Argentina ".com.ar" or for Brazil ".com.br".
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.type = "text/javascript";
      script.dataset.preferenceId = preferences.preferenceId;
      document.getElementById("page-content").innerHTML = "";
      document.querySelector("#page-content").appendChild(script);
    }
  }, [preferences]);

  async function pay() {
    try {
      localStorage.setItem("order_id", orderMp[0].order_id);
      const p = localStorage.getItem("order_id");
      console.log(p, "p");
      dispatch(getPayPreferencesById(orderMp[0].order_id));
      dispatch(updateOrderInfoById(orderMp[0].order_id, payInfo));
      //dispatch(allOrdersByUser(user.user_id))
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
              <input
                type="text"
                name="surname"
                value={payInfo.surname}
                onChange={handleChange}
                placeholder="Apellido"
              />
              <input
                type="text"
                name="email"
                value={payInfo.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
              />
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
              <input
                type="text"
                name="city"
                value={payInfo.city}
                onChange={handleChange}
                placeholder="Ciudad"
              />
              <input
                type="text"
                name="zipCode"
                value={payInfo.zipCode}
                onChange={handleChange}
                placeholder="Código Zip"
              />
            </div>
          </div>
          <div className={dm ? s.dmbuttons : s.buttons}>
            <button onClick={pay} className={dm ? s.dmb2 : s.b2}>
              Confirmar Datos
            </button>

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
