// import React, { useState } from "react";
// import NavBar from "../NavBar/NavBar";
// import Footer from "../Footer/Footer";
// import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { completeProfile } from '../../redux/actions';
// import s from './Profile.module.css'

// function Profile(){
//     const user = useSelector(state => state.currentUser)
//     const [input, setInput] = useState({
//         name: "",
//         email: "",
//         billingAddress: "",
//         zipCode: "",
//     })

//     const dispatch = useDispatch()
//     const history = useHistory()

//     const handleChange = e => {
//         setInput({
//             ...input,
//             [e.target.name]:e.target.value
//         })
//     }

//     const handleSubmit = e => {
//         e.preventDefault();
//         dispatch(completeProfile(input))
//     }

//     const handleEditProfile = () => {
//         history.push('/editProfile');
//     }

//     return(
//         <div>
//             <NavBar/>
//             <div className={s.profileSection}>
//                 { user.name && user.email ? 
//                 <div className={s.profileInfo}>
//                     <span><strong>Usuario:</strong>&nbsp;&nbsp;&nbsp;&nbsp;  {user.name} </span>
//                     <span><strong>Email:</strong>&nbsp;&nbsp;&nbsp;&nbsp; {user.email} </span>
//                     <span><strong>Dirección:</strong>&nbsp;&nbsp;&nbsp;&nbsp; {user.billingAddress} </span>
//                     <span><strong>Código ZIP:</strong>&nbsp;&nbsp;&nbsp;&nbsp; {user.zipCode} </span>
//                     <button onClick={handleEditProfile} >Editar información</button>
//                 </div> : 
//                 <form onSubmit={handleSubmit} className={s.profileForm} >
//                     <input type="text" name="name" value={input.name} onChange={handleChange} placeholder="Usuario"></input>
//                     <input type="email" name="email" value={input.email} onChange={handleChange} placeholder="ejemplo@prueba.com"></input>
//                     <input type="text" name="billingAddress" value={input.billingAddress} onChange={handleChange} placeholder="Dirección"></input>
//                     <input type="text" name="zipCode" value={input.zipCode} onChange={handleChange} placeholder="Código postal"></input>
//                     <button type="submit">Guardar Información</button>
//                 </form>
//                 }
//             </div>
//             <Footer/>
//         </div>
//     )
// }

// export default Profile;