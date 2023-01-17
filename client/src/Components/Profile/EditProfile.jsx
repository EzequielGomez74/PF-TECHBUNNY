import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateUserInfo } from '../../redux/actions';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import s from './EditProfile.module.css'
import { useSelector } from 'react-redux';

function EditProfile () {
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

    const handleSaveChanges = () => {
        dispatch(updateUserInfo(user.user_id, input))
        history.push('/profile');
    }

  return (
    <div>
        <NavBar />
        <div className={s.profileSection}>
        <form className={s.profileForm}>
        <input type="text" name="username" value={input.username} onChange={handleChange} placeholder="Nombre de usuario"></input>
                    <input type="text" name="name" value={input.name} onChange={handleChange} placeholder="Nombre"></input>
                    <input type="text" name="surname" value={input.surname} onChange={handleChange} placeholder="Apellido"></input>
                    <input type="email" name="email" value={input.email} onChange={handleChange} placeholder="ejemplo@prueba.com"></input>
                    <input type="text" name="billingAddress" value={input.billingAddress} onChange={handleChange} placeholder="Dirección"></input>
                    <input type="text" name="zipCode" value={input.zipCode} onChange={handleChange} placeholder="Código postal"></input>
            <button onClick={handleSaveChanges} >Guardar Cambios</button>
        </form>
        </div>
        <Footer />
    </div>
  )
}

export default EditProfile