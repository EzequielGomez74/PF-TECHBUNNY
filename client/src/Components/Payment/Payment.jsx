import React, { useState } from 'react';
import s from './Payment.module.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Payment() {
    const dm = useSelector(state => state.darkMode);
    const [payInfo, setPayInfo] = useState({
        datos: '',
        dni: '',
        email:'',
        domicilio:'',
        cp:'',
        recibe:'',
        ref1: '',
        ref2:''
    })

    const handleChange = (e) => {
        setPayInfo({
            ...payInfo,
            [e.target.name]: e.target.value
        })
    }

    const history = useHistory();
    const handleCart = () => {
        history.push('/cart');
    }


  return (
    <div className={dm ? s.dmpayPage : s.payPage}>
        <NavBar />
        <section className={dm ? s.dmpayment : s.payment}>
            <div className={dm ? s.dmpayInfo : s.payInfo}>
                <h2>Pago</h2>
                <div className={dm ? s.dmallInfo : s.allInfo}>
                    <div className={dm ? s.dmrequired : s.required}>
                        <label>Detalles requeridos</label>
                        <input type="text" name="datos" value={payInfo.datos} onChange={handleChange} placeholder='Nombre y Apellido'  />
                        <input type="text" name="dni" value={payInfo.dni} onChange={handleChange} placeholder='DNI'  />
                        <input type="text" name="email" value={payInfo.email} onChange={handleChange} placeholder='Correo electrónico'  />
                        <input type="text" name="domicilio" value={payInfo.domicilio} onChange={handleChange} placeholder='Domicilio'  />
                        <input type="text" name="cp" value={payInfo.cp} onChange={handleChange} placeholder='Código Postal'  />
                    </div>
                    <div className={dm ? s.dmoptional : s.optional}>
                        <label>Referencias</label>
                        <input type="text" name="recibe" value={payInfo.recibe} onChange={handleChange} placeholder='Recibe'  />
                        <input type="text" name="ref1" value={payInfo.ref1} onChange={handleChange} placeholder='Referencia 1'  />
                        <input type="text" name="ref2" value={payInfo.ref2} onChange={handleChange} placeholder='Referencia 2'  />
                    </div>
                </div>
                <div className={dm ? s.dmbuttons : s.buttons} >
                    <button className={dm ? s.dmb2 : s.b2}>Mercado Pago</button>
                    <button className={dm ? s.dmb1 : s.b1} onClick={handleCart} >Carrito</button> 
                    {/* Los llevará a Mercado Pago */}
                </div>
            </div>            
        </section>
        <Footer />
    </div>
  )
}

export default Payment


// La página de carrito tiene que despachar una acción cuando clickee procesar compra. 
// Información que se recibirá en esta sección para tener el monto total de la compra
//Pendiente: Linkear el boton con el Mercado Pago y enviarle la info del cart como la de payment.