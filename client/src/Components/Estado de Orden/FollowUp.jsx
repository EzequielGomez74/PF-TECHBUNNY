import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useSelector } from 'react-redux';
import s from './FollowUp.module.css';


function FollowUp(){

    const dm = useSelector(state => state.darkMode);

    return(
        <div>
            <NavBar />
            <div className={dm ? s.dmbackgroundForm : s.backgroundForm}>
                <div className={dm ? s.dmformStyle : s.formStyle}>
                    <div className={dm ? s.dmformTitle : s.formTitle}>
                        <h1>VER ESTADO DE PEDIDO:</h1>
                    </div>
                    <form>
                        {/* <div className={dm ? s.dmformOptions : s.formOptions}>
                        <h2>Opción 1</h2>
                        <h3>Indicar código de seguimiento</h3>
                        <input type="search" placeholder={`Código de seguimiento(por ejemplo, 17NFP89XS7)`} />
                        </div> */}
                        <div className={dm ? s.dmformOptions : s.formOptions}>
                        <h2>Opción 1</h2>
                        <h3>Indicar número de pedido</h3>
                        <input type="search" placeholder={`Número de Pedido(por ejemplo, 444455)`}/>
                        </div>
                        <div className={dm ? s.dmbtnDiv : s.btnDiv}>
                        <button className={dm ? s.dmbtnFollowUp : s.btnFollowUp} type="submit">
                        <p> ENCONTRAR PEDIDO </p>
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