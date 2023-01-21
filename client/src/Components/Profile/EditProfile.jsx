import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateUserInfo } from '../../redux/actions';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import s from './EditProfile.module.css';
import { useSelector } from 'react-redux';
import img from "../../Photos/conejoperfil.png";

function EditProfile () {
    const user = useSelector(state => state.loggedUser)
    const dm = useSelector(state => state.darkMode);

    const [input, setInput] = useState({
        profilePicture:"",
        name: "",
        surname:"",
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
        <div className={dm? s.dmprofileSection : s.profileSection}>
        <div className="imgContainer">
            <div className="imgBunny">
              <img src={img} alt="bunny login" className={dm ? s.dmimg : s.img} />
            </div>
            </div>
        <form className={dm? s.dmprofileForm : s.profileForm}>
                    <input type="text" name="name" value={input.name} onChange={handleChange} placeholder="Nombre"></input>
                    <input type="text" name="surname" value={input.surname} onChange={handleChange} placeholder="Apellido"></input>
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