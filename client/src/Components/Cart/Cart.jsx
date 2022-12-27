import React from 'react'
import { useSelector } from 'react-redux'
import CartCard from '../CartCard/CartCard';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import s from './Cart.module.css'

function Cart() {
  const cart = useSelector(state => state.cart);
  return (
    <div>
      <NavBar />
      <section className={s.cartSection}>
          <div>
            {cart.length ? cart.map(p => <CartCard 
              key={p.id} id={p.id} totalQuantity={p.totalQuantity}
              brand={p.brand} name={p.name} stock={p.stock}
              image={p.image} price={p.price}
            />)
            : 
            <div>
              <div className={s.heroCart}></div>
              <p className={s.message}>¡Todavía no has agregado productos a tu carrito!</p>
            </div>}
          </div>
          <button className={cart.length ? s.mainButton : s.none}>Procesar Compra</button>
      </section>
      <Footer/>
    </div>
  )
}

export default Cart

// Recordatorio
// Cuando se terminé el carrito de compra(se recibe por body el user_id, los products, review y rating) se debe despachar un action creator CREATE_ORDER(user_id, products: [{product_id: 0, quantity:0...}])