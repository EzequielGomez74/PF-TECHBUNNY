import React from "react";
import './FollowUp.css';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";


function FollowUp(){
    return(
        <div>
            <NavBar />
            <div className="backgroundForm">
                <div className="formStyle">
                    <div className="formTitle">
                        <h1>SEGUIMIENTO DE PEDIDO</h1>
                    </div>
                    <form>
                        <div className="formOptions">
                        <h2>Opción 1</h2>
                        <h3>Indicar código de seguimiento</h3>
                        <input type="search" placeholder={`Código de seguimiento(por ejemplo, 17NFP89XS7)`} />
                        </div>
                        <div className="formOptions">
                        <h2>Opción 2</h2>
                        <h3>Indicar número de pedido</h3>
                        <input classname= 'prueba 'type="search" placeholder={`Número de Pedido(por ejemplo, 444455)`}/>
                        </div>
                        <div className="btnDiv">
                        <button type="submit">
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