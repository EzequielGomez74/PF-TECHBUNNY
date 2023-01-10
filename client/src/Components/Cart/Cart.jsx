import React from 'react'
import { useSelector } from 'react-redux'
import CartCard from '../CartCard/CartCard';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import s from './Cart.module.css'
import img from '../../Photos/bunnycart.png'
import { Link } from 'react-router-dom';

function Cart() {
  const cart = useSelector(state => state.cart);
  const dm = useSelector(state => state.darkMode);
  return (
    <div>
      <NavBar />
      <section className={dm ? s.dmcartSection : s.cartSection}>
          {cart.length ?
          <div>
            <div>
              {cart.map(p => <CartCard 
              key={p.id} id={p.id} totalQuantity={p.totalQuantity}
              brand={p.brand} name={p.name} stock={p.stock}
              image={p.image} price={p.price}
            />)}
            </div>
            <Link to="/payment"> <button className={dm ? s.dmmainButton : s.mainButton}>Procesar Compra</button> </Link>
          </div>:
          <div>
            <div>
              <img src={img} alt="bunny cart" className={s.img}/> 
            </div>
              <p className={dm ? s.dmmessage : s.message}>¡Todavía no has agregado productos a tu carrito!</p>
          </div>
          
          }
      </section>
      <Footer />
    </div>
  );
}

export default Cart;

// Recordatorio
// Cuando se terminé el carrito de compra(se recibe por body el user_id, los products, review y rating) se debe despachar un action creator CREATE_ORDER(user_id, products: [{product_id: 0, quantity:0...}])
