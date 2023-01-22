import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUserInfo } from '../../redux/actions';
import s from "./Profile.module.css";
import img from "../../Photos/conejoperfil.png";
import { useEffect,useRef } from "react";
import { allOrdersByUser } from '../../redux/actions'

function Profile(){
    const user = useSelector(state => state.loggedUser)
    const orders = useSelector(state => state.ordersByUser)
    const products = useSelector(state => state.products)
    const dm = useSelector(state => state.darkMode);
    const initialLoad = useRef(true)
    const dispatch = useDispatch()
    const history = useHistory()
    const [check,setCheck]=useState(0)

    const [input, setInput] = useState({
        profilePicture:"",
        username: "",
        name: "",
        surname:"",
        email: "",
        billingAddress: "",
        zipCode: "",
    })

    

    useEffect(() => {
        if(initialLoad.current){
        dispatch(allOrdersByUser(user.user_id))
        initialLoad.current=false
        return
    }
    orders.forEach((o)=>{
        const orderProducts=[]
        for(let i = 0; i < o.Products.length; i++) {
            orderProducts.push(products.find(p => p.product_id === o.Products[i].product_id))
        }
        o.Products=orderProducts
    })
    console.log(orders)
    if(orders.length>0)
    setCheck(Object.keys(orders[0].Products[0]).length)
}, [dispatch, orders, user.user_id, products, orders.length, check])
 

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
            <div className={dm? s.dmprofileSection : s.profileSection}>
                { user.username && user.email ? 
                <div>
                    <section className={s.profileImgInfoSection}>
                        <div className="imgContainer">
                            <img src={img} alt="bunny login" className={dm ? s.dmimg : s.img} />
                        </div>
                        <div className={dm? s.dmprofileInfo : s.profileInfo}>
                            <span><strong>Nombre de usuario:</strong>&nbsp;&nbsp;&nbsp;&nbsp;  {user.username} </span>
                            <span><strong>Nombre:</strong>&nbsp;&nbsp;&nbsp;&nbsp;  {user.name} </span>
                            <span><strong>Apellido:</strong>&nbsp;&nbsp;&nbsp;&nbsp;  {user.surname} </span>
                            <span><strong>Email:</strong>&nbsp;&nbsp;&nbsp;&nbsp; {user.email} </span>
                            <span><strong>Dirección:</strong>&nbsp;&nbsp;&nbsp;&nbsp; {user.billingAddress} </span>
                            <span><strong>Código ZIP:</strong>&nbsp;&nbsp;&nbsp;&nbsp; {user.zipCode} </span>
                            <button onClick={handleEditProfile} >Editar información</button>
                        </div>
                    </section>
                    <section className={s.profileOrdersHistory}>
                        <h3>Historial de Ordenes</h3>
                        <br />
                        { orders.length ? orders.map(o => <div className={s.orderContainer}>
                                <div className={dm ? s.dmorderByUserInfo :s.orderByUserInfo}>
                                    <span>Order N° {o.order_id}</span>
                                    <span>Status: {o.status === "processed"?"Procesado":o.status === "canceled"?"Cancelado":"Completado"}</span>
                                </div> 
                                <ul className={s.orderProductsContainer}>
                                    { o.Products?.map(p => <li className={s.liOrderElement}>
                                        <img className={s.productOrderImage} src={p.image} alt={p.product_id} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <div className={s.productOrderInfo}>
                                            <span>{p.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <span>US${p.price}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <span>{p.count}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </div>  
                                    </li>
                                    )}
                                </ul>
                                <span className={s.orderTotal}>Total: US${o.total}</span>
                            </div>) :
                             'Está vacio'}
                    </section>
                </div> : 
                <form onSubmit={handleSubmit} className={dm? s.dmprofileForm : s.profileForm} >
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