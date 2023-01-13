import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartCard from '../CartCard/CartCard';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import s from './Cart.module.css'
import img from '../../Photos/bunnycart.png'
import { Link } from 'react-router-dom';
import { allCartByUser, createOrder } from '../../redux/actions'

function Cart() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  let loggedUser = useSelector(state => state.loggedUser);
  const dm = useSelector(state => state.darkMode);

  //Para que al recargar la pagina no se borre la cantidad de favoritos.
  useEffect(() => {
    console.log("cualquier cosa");
    if(loggedUser.user_id){
      dispatch(allCartByUser(loggedUser.user_id));
      console.log("OTRA COSA-desde Cart");
    } 
  },[loggedUser])

  const handleNewOrder = () => {
    dispatch(createOrder(loggedUser.user_id));
  }

  return (
    <div>
      <NavBar />
      <section className={dm ? s.dmcartSection : s.cartSection}>
          {cart.length ?
          <div>
            <div>
              {cart.map(p => <CartCard 
              key={p.product_id} user_id={loggedUser.user_id} product_id={p.product_id} count={p.count}
              brand={p.brand} product_name={p.product_name} stock={p.stock}
              image={p.image} price={p.price}
            />)}
            </div>
            <Link to="/payment"> <button onClick={handleNewOrder} className={dm ? s.dmmainButton : s.mainButton}>Procesar Compra</button> </Link>
          </div>:
          <div>
            <div>
              <img src={img} alt="bunny cart" className={s.img}/> 
            </div>
              <p className={dm ? s.dmmessage : s.message}>¡Todavía no has agregado productos a tu carrito!</p>
          </div>
          
          }
      </section>
      <Footer/>
    </div>
  )
}

export default Cart