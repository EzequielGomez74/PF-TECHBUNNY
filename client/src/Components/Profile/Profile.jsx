import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

function Profile(){

    const [input, setInput] = useState({
        usuario: "",
        correo: "",
        direccion: "",
        telefono: "",
        cp: "",
    })

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    


    return(
        <div>
            <NavBar/>
            <div>
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <form>
                <input type="text" name="usuario" value={input.usuario} placeholder="Usuario"></input>
                <input type="email" name="correo" value={input.correo} placeholder="ejemplo@prueba.com"></input>
                <input type="text" name="direccion" value={input.direccion} placeholder="Dirección"></input>
                <input type="tel" name="telefono" value={input.telefono} placeholder="Teléfono"></input>
                <input type="text" name="cp" value={input.cp} placeholder="Código postal"></input>
                <button  >Guardar Cambios</button>
                </form>
            </div>
            <Footer/>

        </div>
    )
}

export default Profile;