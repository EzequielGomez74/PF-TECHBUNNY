import React from 'react';
import s from './Payment.module.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux'

function Payment() {
    const dm = useSelector(state => state.darkMode);
  return (
    <div className={dm ? s.dmpayPage : s.payPage}>
        <NavBar />
        <section className={dm ? s.dmpayment : s.payment}>
            <div className={dm ? s.dmpayInfo : s.payInfo}>
                <h2>Pago</h2>
                <div className={dm ? s.dmallInfo : s.allInfo}>
                    <div className={dm ? s.dmrequired : s.required}>
                        <label>Detalles requeridos</label>
                        <input type="text" name="datos" placeholder='Nombre y Apellido'  />
                        <input type="text" name="dni" placeholder='DNI'  />
                        <input type="text" name="email" placeholder='Correo electrónico'  />
                        <input type="text" name="domicilio" placeholder='Domicilio'  />
                        <input type="text" name="cp" placeholder='Código Postal'  />
                    </div>
                    <div className={dm ? s.dmoptional : s.optional}>
                        <label>Referencias</label>
                        <input type="text" name="recibe" placeholder='Recibe'  />
                        <input type="text" name="ref1" placeholder='Referencia 1'  />
                        <input type="text" name="ref2" placeholder='Referencia 2'  />
                    </div>
                </div>
                <div className={dm ? s.dmbuttons : s.buttons} >
                    <button className={dm ? s.dmb2 : s.b2}>Mercado Pago</button>
                    <button className={dm ? s.dmb1 : s.b1}>Carrito</button> 
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