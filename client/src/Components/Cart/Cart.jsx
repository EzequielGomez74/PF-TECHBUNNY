import React from 'react'
import { useSelector } from 'react-redux'
import CardV from '../Card V/CardV';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';

function Cart() {
  const cart = useSelector(state => state.cart);
  return (
    <div>
      <NavBar />
        {cart.length ? cart.map(p => <CardV 
          key={p.id}
          id={p.id}
          brand={p.brand}
          name={p.name}
          image={p.image}
          price={p.price}
        />)
      : <p>'Todavía no has agregado productos a tu carrito'</p>}
      <Footer/>
    </div>
  )
}

export default Cart