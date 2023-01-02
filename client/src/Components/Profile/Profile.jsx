import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { completeProfile } from '../../redux/actions'
import { useDispatch, useSelector } from "react-redux";

function Profile(){

    const [input, setInput] = useState({
        usuario: "",
        correo: "",
        direccion: "",
        telefono: "",
        cp: "",
    })

    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile)

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(completeProfile(input));
        console.log(profile)
    }


    return(
        <div>
            <NavBar/>
            <div>
                { profile.usuario === '' ? 
                <div>
                    <span> {profile.usuario} </span>
                    <span> {profile.correo} </span>
                    <span> {profile.direccion} </span>
                    <span> {profile.telefono} </span>
                    <span> {profile.cp} </span>
                </div> : 
                <form onSubmit={handleSubmit} >
                    <input type="text" name="usuario" value={input.usuario} onChange={handleChange} placeholder="Usuario"></input>
                    <input type="email" name="correo" value={input.correo} onChange={handleChange} placeholder="ejemplo@prueba.com"></input>
                    <input type="text" name="direccion" value={input.direccion} onChange={handleChange} placeholder="Dirección"></input>
                    <input type="tel" name="telefono" value={input.telefono} onChange={handleChange} placeholder="Teléfono"></input>
                    <input type="text" name="cp" value={input.cp} onChange={handleChange} placeholder="Código postal"></input>
                    <button type="submit">Guardar Cambios</button>
                </form>}
            </div>
            <Footer/>
        </div>
    )
}

export default Profile;