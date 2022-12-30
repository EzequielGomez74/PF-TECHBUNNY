import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux'
import CartCard from '../CartCard/CartCard';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import s from './Cart.module.css'




function Cart() {
  const cart = useSelector(state => state.cart);



  let productList = [];
  let carrito = []

  

  let total = 0;

  
  async function pay() {
      try{
        const order_id = 1;
        const preference = await axios.get(`http://localhost:3001/orders/pagar/${order_id}`)        
        console.log("PREFERENCIAAAAS",preference);
        var script = document.createElement("script");
    
          // The source domain must be completed according to the site for which you are integrating.
          // For example: for Argentina ".com.ar" or for Brazil ".com.br".
          script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
          script.type = "text/javascript";
          script.dataset.preferenceId = preference.data.preferenceId;
          document.getElementById("page-content").innerHTML = "";
          document.querySelector("#page-content").appendChild(script);
      }
      catch(error) {
        console.error(error.message)  
      }
  }

  return (
    <div>
      <script src="https://sdk.mercadopago.com/js/v2"></script>


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
                <button onClick={pay} > pagaaaar</button>
              <div><h1>PEPITO RULES</h1>
                <div className='page-content' id="page-content" ></div>
              </div>



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