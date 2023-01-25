import React, { useEffect,useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../CartCard/CartCard";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import s from "./Cart.module.css";
import img from "../../Photos/bunnycart.png";
import { Link, useHistory } from "react-router-dom";
import { allCartByUser, createOrder } from "../../redux/actions";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const dispatch = useDispatch();
  let loggedUser = useSelector((state) => state.loggedUser);
  const dm = useSelector((state) => state.darkMode);
  let [total,setTotal] = useState(0)
  let initialLoad =useRef(true)

  //Para que al recargar la pagina no se borre la cantidad de favoritos.
  useEffect(() => {
    if (loggedUser.user_id) {
if(initialLoad.current){
      dispatch(allCartByUser(loggedUser.user_id));
      initialLoad.current=false
      return
    }
    }
if(cart.length >0){
  console.log("me meti aqui en el useeffect de cart")
setTotal(cart.reduce((tot,curr)=>{
return tot + (curr.price* curr.count)
},0))
}
  }, [loggedUser,cart]);

  const handleNewOrder = () => {
    dispatch(
      createOrder(loggedUser.user_id, () => {
        history.push("/payment");
      })
    );
  };

  return (
    <div className={dm ? s.dmcartPage : s.cartPage}>
      <NavBar />
      <section className={dm ? s.dmcartSection : s.cartSection}>
        {cart.length ? (
          <div>
            <div>
              {cart.map((p) => (
                <CartCard
                  key={p.product_id}
                  user_id={loggedUser.user_id}
                  product_id={p.product_id}
                  count={p.count}
                  brand={p.brand}
                  product_name={p.product_name}
                  stock={p.stock}
                  image={p.image}
                  price={p.price}
                />
              ))}
            </div>
            <div className={dm ? s.dmcartTotal : s.cartTotal}>
              <span> <strong>Total:</strong> US$ {total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleNewOrder}
              className={dm ? s.dmmainButton : s.mainButton}
            >
              Procesar Compra
            </button>
          </div>
        ) : (
          <div>
            <div>
              <img src={img} alt="bunny cart" className={s.img} />
            </div>
            <p className={dm ? s.dmmessage : s.message}>
              ¡Todavía no has agregado productos a tu carrito!
            </p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default Cart;

// Recordatorio
// Cuando se terminé el carrito de compra(se recibe por body el user_id, los products, review y rating) se debe despachar un action creator CREATE_ORDER(user_id, products: [{product_id: 0, quantity:0...}])
