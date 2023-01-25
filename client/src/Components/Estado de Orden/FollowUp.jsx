import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useSelector } from 'react-redux';
import s from './FollowUp.module.css';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";


function FollowUp(){
    const dm = useSelector(state => state.darkMode);

    const user = useSelector((state) => state.loggedUser);
    const history = useHistory()
    const [orderId, setOrderId] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!user.user_id){
            Swal.fire({
                title: "¡Alerta!",
                text: "Para verificar el estado de tu orden, necesitas ingresar a tu cuenta.",
                icon: "warning",
                confirmButtonText: "Iniciar sesión",
            }).then((response) => {
                if (response.isConfirmed) history.push("/login");
            });
        }
        if(user.user_id && !orderId){
            Swal.fire({
                title: "Ingresa el ID de tu pedido",
                confirmButtonColor: '#20232A',
            })
        }
        if(user.user_id && orderId){  
            history.push(`/followUp/${user.user_id}/${orderId}`)
        }
    }
    
    return(
        <div>
            <NavBar />
            <div className={dm ? s.dmbackgroundForm : s.backgroundForm}>
                <div className={dm ? s.dmformStyle : s.formStyle}>
                    <div className={dm ? s.dmformTitle : s.formTitle}>
                        <h1>VER ESTADO DE PEDIDO:</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* <div className={dm ? s.dmformOptions : s.formOptions}>
                        <h2>Opción 1</h2>
                        <h3>Indicar código de seguimiento</h3>
                        <input type="search" placeholder={`Código de seguimiento(por ejemplo, 17NFP89XS7)`} />
                        </div> */}
                        <div className={dm ? s.dmformOptions : s.formOptions}>
                        <h2>Opción 1</h2>
                        <h3>Indicar número de pedido</h3>
                        <input type="search" value={orderId} onChange={e => setOrderId(e.target.value)} placeholder={`Número de Pedido(por ejemplo, 444455)`}/>
                        </div>
                        <div className={dm ? s.dmbtnDiv : s.btnDiv}>
                        <button className={dm ? s.dmbtnFollowUp : s.btnFollowUp} type="submit">
                            ENCONTRAR PEDIDO
                        </button>
                        </div>
                    </form>
                </div>

            </div>
            <Footer />
        </div>
    )

}

export default FollowUp;