import React, { useEffect, useState } from "react";
import s from "./Payment.module.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getPayPreferencesById,
  updateOrderInfoById,
} from "../../redux/actions";

function Payment() {
  const dm = useSelector((state) => state.darkMode);
  const preferences = useSelector((state) => state.preferences);
  const user = useSelector((state) => state.loggedUser);
  const orderMp = useSelector((state) => state.orders);
  const dispatch = useDispatch();
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

  const history = useHistory();
  const handleCart = () => {
    history.push("/cart");
  };

  useEffect(() => {
    if (Object.keys(preferences).length !== 0) {
      console.log("PREFERENCIAAAAS", preferences);
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
              Mercado Pago
            </button>
            <button className={dm ? s.dmb1 : s.b1} onClick={handleCart}>
              Carrito
            </button>
            <div className="page-content" id="page-content"></div>
            {/* Los llevará a Mercado Pago */}
          </div>
          {/* <div>
						<h1>MERCADOPAGO</h1>
						<button onClick={pay}> GENERAR LINK DE PAGO</button>
						<div className="page-content" id="page-content"></div>
					</div> */}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Payment;

// import React, { useState, useEffect } from 'react';
// import s from './Payment.module.css';
// import NavBar from '../NavBar/NavBar';
// import Footer from '../Footer/Footer';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { getPayPreferencesById } from '../../redux/actions'

// function Payment() {
//     const dm = useSelector(state => state.darkMode);
//     const dispatch = useDispatch();
//     // const container = useRef()
//     const order = useSelector(state => state.orders);
//     const preferences = useSelector(state => state.preferences)
//     const [payInfo, setPayInfo] = useState({
//         datos: '',
//         dni: '',
//         email:'',
//         domicilio:'',
//         cp:'',
//         recibe:'',
//         ref1: '',
//         ref2:''
//     })
//     const [orderId, setOrderId] = useState('0')

//     const handleChange = (e) => {
//         setPayInfo({
//             ...payInfo,
//             [e.target.name]: e.target.value
//         })
//     }

//     // console.log(order[0].order_id)

//     const history = useHistory();
//     const handleCart = () => {
//         history.push('/cart');
//     }

//     useEffect(() => {
//         if (Object.keys(preferences).length !== 0) {
//         console.log("PREFERENCIAAAAS",preferences);
//         var script = document.createElement("script");

//         // The source domain must be completed according to the site for which you are integrating.
//         // For example: for Argentina ".com.ar" or for Brazil ".com.br".
//         script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
//         script.type = "text/javascript";
//         script.dataset.preferenceId = preferences;
//         document.getElementById("page-content").innerHTML = "";
//         document.querySelector("#page-content").appendChild(script);
//         }
//         if (order.length !== 0) {
//             setOrderId(order[0].order_id)
//         }
//     }, [preferences, order])

//     async function pay() {
//         try{
//             console.log('desde pay function', orderId)
//             dispatch(getPayPreferencesById(1))
//         }
//         catch(error) {
//           console.error(error.message)
//         }
//     }

//   return (
//     <div className={dm ? s.dmpayPage : s.payPage}>
//         <NavBar />
//         <section className={dm ? s.dmpayment : s.payment}>
//             <div className={dm ? s.dmpayInfo : s.payInfo}>
//                 <h2>Pago</h2>
//                 <div className={dm ? s.dmallInfo : s.allInfo}>
//                     <div className={dm ? s.dmrequired : s.required}>
//                         <label>Detalles requeridos</label>
//                         <input type="text" name="datos" value={payInfo.datos} onChange={handleChange} placeholder='Nombre y Apellido'  />
//                         <input type="text" name="dni" value={payInfo.dni} onChange={handleChange} placeholder='DNI'  />
//                         <input type="text" name="email" value={payInfo.email} onChange={handleChange} placeholder='Correo electrónico'  />
//                         <input type="text" name="domicilio" value={payInfo.domicilio} onChange={handleChange} placeholder='Domicilio'  />
//                         <input type="text" name="cp" value={payInfo.cp} onChange={handleChange} placeholder='Código Postal'  />
//                     </div>
//                     <div className={dm ? s.dmoptional : s.optional}>
//                         <label>Referencias</label>
//                         <input type="text" name="recibe" value={payInfo.recibe} onChange={handleChange} placeholder='Recibe'  />
//                         <input type="text" name="ref1" value={payInfo.ref1} onChange={handleChange} placeholder='Referencia 1'  />
//                         <input type="text" name="ref2" value={payInfo.ref2} onChange={handleChange} placeholder='Referencia 2'  />
//                     </div>
//                 </div>
//                 <div className={dm ? s.dmbuttons : s.buttons} >
//                     <div id='page-content' className='page-content'><button className={dm ? s.dmb2 : s.b2} onClick={pay} >Mercado Pago</button></div>
//                     <button className={dm ? s.dmb1 : s.b1} onClick={handleCart} >Carrito</button>
//                     {/* Los llevará a Mercado Pago */}

// 					<div>
// 						<h1>MERCADOPAGO</h1>
// 						<button onClick={pay}> GENERAR LINK DE PAGO</button>
// 						<div className="page-content" id="page-content"></div>
// 					</div>

//                 </div>
//             </div>
//         </section>
//         <Footer />
//     </div>
//   )
// }

// export default Payment

// // La página de carrito tiene que despachar una acción cuando clickee procesar compra.
// // Información que se recibirá en esta sección para tener el monto total de la compra
// //Pendiente: Linkear el boton con el Mercado Pago y enviarle la info del cart como la de payment.
