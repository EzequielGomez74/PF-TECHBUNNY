import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUserInfo } from '../../redux/actions';
import s from './Profile.module.css'

function Profile(){
    const user = useSelector(state => state.loggedUser)
    const [input, setInput] = useState({
        profilePicture:"",
        username: "",
        name: "",
        surname:"",
        email: "",
        billingAddress: "",
        zipCode: "",
    })

    const dispatch = useDispatch()
    const history = useHistory()

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(updateUserInfo(user.user_id, input))
    }

    const handleEditProfile = () => {
        history.push('/editProfile');
    }

    return(
        <div>
            <NavBar/>
            <div className={s.profileSection}>
                { user.name && user.email && user.billingAddress ? 
                <div className={s.profileInfo}>
                    <span><strong>Nombre de usuario:</strong>&nbsp;&nbsp;&nbsp;&nbsp;  {user.username} </span>
                    <span><strong>Nombre:</strong>&nbsp;&nbsp;&nbsp;&nbsp;  {user.name} </span>
                    <span><strong>Apellido:</strong>&nbsp;&nbsp;&nbsp;&nbsp;  {user.surname} </span>
                    <span><strong>Email:</strong>&nbsp;&nbsp;&nbsp;&nbsp; {user.email} </span>
                    <span><strong>Dirección:</strong>&nbsp;&nbsp;&nbsp;&nbsp; {user.billingAddress} </span>
                    <span><strong>Código ZIP:</strong>&nbsp;&nbsp;&nbsp;&nbsp; {user.zipCode} </span>
                    <button onClick={handleEditProfile} >Editar información</button>
                </div> : 
                <form onSubmit={handleSubmit} className={s.profileForm} >
                    <input type="text" name="username" value={input.username} onChange={handleChange} placeholder="Nombre de usuario"></input>
                    <input type="text" name="name" value={input.name} onChange={handleChange} placeholder="Nombre"></input>
                    <input type="text" name="surname" value={input.surname} onChange={handleChange} placeholder="Apellido"></input>
                    <input type="email" name="email" value={input.email} onChange={handleChange} placeholder="ejemplo@prueba.com"></input>
                    <input type="text" name="billingAddress" value={input.billingAddress} onChange={handleChange} placeholder="Dirección"></input>
                    <input type="text" name="zipCode" value={input.zipCode} onChange={handleChange} placeholder="Código postal"></input>
                    <button type="submit">Guardar Información</button>
                </form>
                }
            </div>
            <Footer/>
        </div>
    )
}

export default Profile;