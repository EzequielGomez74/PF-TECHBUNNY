import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import CartCard from "../CartCard/CartCard";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import s from "./Cart.module.css";
import { useRef } from "react";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const refe = useRef();
  async function pay() {
    try {
      const order_id = 1;

      const preference = await axios.get(
        `http://localhost:3001/orders/pagar/${order_id}`
      ); //ESTO GENERA LAS PREFERENCES CON EL ORDER_ID QUE LE PASEMOS
      var script = document.createElement("script");

      // The source domain must be completed according to the site for which you are integrating.
      // For example: for Argentina ".com.ar" or for Brazil ".com.br".
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.type = "text/javascript";
      script.dataset.preferenceId = preference.data.preferenceId;
      // document.getElementById("buttonPagar").innerHTML = "";
      // document.querySelector("#buttonPagar").appendChild(script);
      refe.current.appendChild(script);
    } catch (error) {
      console.error("HOLAA", error.message);
    }
  }

  return (
    <div>
      <NavBar />
      <section className={s.cartSection}>
        <div>
          {cart.length ? (
            cart.map((p) => (
              <CartCard
                key={p.id}
                id={p.id}
                totalQuantity={p.totalQuantity}
                brand={p.brand}
                name={p.name}
                stock={p.stock}
                image={p.image}
                price={p.price}
              />
            ))
          ) : (
            <div>
              <div>
                <h1>PEPITO RULES</h1>

                <a onClick={pay}>orden 1</a>
                <br />
                <hr />

                <a onClick={pay}>orden 2</a>
                <br />
                <hr />
                <a onClick={pay}>orden 3</a>
                <div className="buttonPagar" id="buttonPagar" ref={refe}>
                  {" "}
                  <br />
                  <hr />
                  ACA VA EL BUTTON <br />
                  <hr />
                </div>
              </div>

              <div className={s.heroCart}></div>
              <p className={s.message}>
                ¡Todavía no has agregado productos a tu carrito!
              </p>
            </div>
          )}
        </div>
        <button className={cart.length ? s.mainButton : s.none}>
          Procesar Compra
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Cart;

// Recordatorio
// Cuando se terminé el carrito de compra(se recibe por body el user_id, los products, review y rating) se debe despachar un action creator CREATE_ORDER(user_id, products: [{product_id: 0, quantity:0...}])
