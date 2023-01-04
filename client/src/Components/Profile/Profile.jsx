import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import ProfileForm from "./ProfileForm";

function Profile(){
    const user = useSelector(state => state.currentUser)
    const [input, setInput] = useState({
        usuario: "",
        correo: "",
        direccion: "",
        telefono: "",
        cp: "",
    })

    return(
        <div>
            <NavBar/>
            <div>
                { user.usuario && user.correo  ? 
                <div>
                    <span> {user.usuario} </span>
                    <span> {user.correo} </span>
                    <span> {user.direccion} </span>
                    <span> {user.telefono} </span>
                    <span> {user.cp} </span>
                    <button>Actualizar información</button>
                </div> : <ProfileForm input={input} setInput={setInput} />
                }
            </div>
            <Footer/>
        </div>
    )
}

export default Profile;