import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../redux/actions";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import s from "./Details.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faTruck,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../Dropdown/Dropdown";
import DisplayReview from "./DisplayReview";

function Details() {
  const { id } = useParams();
  const product = useSelector((state) => state.detail);
  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  const initialLoad = useRef(true);
  const [quantity, setQuantity] = useState(0);
  const [stock, setStock] = useState(product.stock);
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    console.log("effect");
    if (initialLoad.current) {
      console.log("entro al dispatch");
      dispatch(actions.getProductById(id));
      dispatch(actions.getReviewsBy(id));
      initialLoad.current = false;
    }
    setStock(product.stock);
  }, [product, reviews, trigger]);

  function handlePost(review) {
    dispatch(
      actions.postReview(review, () => {
        initialLoad.current = true;
        setTrigger(!trigger);
      })
    );
  }

  // function removeCartProductsFromProduct(){
  //   const productFound = cart.find((product)=>id === product.product_id)
  //   if(productFound)
  //     product.stock -= productFound.stock
  // }
  const handlePlus = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
      setStock(stock - 1);
    }
  };

  const handleMinus = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setStock(stock + 1);
    }
  };

  const description = product.description?.map((ele) => {
    const key = Object.keys(ele)[0];
    const value = Object.values(ele)[0];

    switch (key) {
      case "ul":
        return (
          <ul>
            {value.map((data) => {
              return <li>{data}</li>;
            })}
          </ul>
        );
      case "p":
        return <p>{value}</p>;
      default:
        return <br />;
    }
  });

  // Inicio de Lógica Comentarios

  // Fin de Lógica Comentarios

  return (
    <div className={s.detailPage}>
      <NavBar />
      <section className={s.productDetails}>
        <div className={s.block}>
          <div className={s.productImage}>
            <div className={s.icon}>
              <button className={s.heart}>
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
            <div className={s.imgP}>
              <img src={product.image} alt={product.product_id} />
            </div>
          </div>
          <div className={s.productInfo}>
            <div>
              <Dropdown description={description} />
            </div>
          </div>
        </div>
        <div className={s.productCart}>
          <span className={s.pId}>ID Producto: {product.product_id} </span>
          <h2 className={s.pBrand}>{product.brand}</h2>
          <h1 className={s.pName}>{product.name}</h1>
          <div className={s.pScore}>
            {reviews && reviews.length ? (
              new Array(product.rating)
                .fill(undefined)
                .map((ele, idx) => <FontAwesomeIcon icon={faStar} key={idx} />)
            ) : (
              <span>Sin puntuación</span>
            )}
          </div>
          <div className={s.delivery}>
            <h3>Tipo de Entrega</h3>
            <div>
              <input
                type="radio"
                id="contactChoice1"
                name="contact"
                value="email"
              />
              <label>
                &nbsp;&nbsp;
                <FontAwesomeIcon icon={faTruck} /> &nbsp;&nbsp;Despacho a
                domicilio{" "}
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="contactChoice1"
                name="contact"
                value="email"
              />
              <label>
                &nbsp;&nbsp;
                <FontAwesomeIcon icon={faStore} /> &nbsp;&nbsp;Retiro en tienda{" "}
              </label>
            </div>
          </div>
          <hr />
          <h2 className={s.price}>US${product.price}</h2>
          <div className={s.quantity}>
            <div>
              <button onClick={handleMinus}>-</button>&nbsp;&nbsp;&nbsp;&nbsp;
              {quantity}&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={handlePlus}>+</button>
            </div>
            <span className={s.stock}>
              &nbsp;&nbsp;&nbsp;&nbsp;Stock disponible: {stock}{" "}
            </span>
          </div>
          <button type="submit" className={s.mainButton}>
            Agregar al Carrito
          </button>
        </div>
      </section>

      <div className={s.sub}>
        <div className={s.subTitles}>
          <h5>Recomendados</h5>
          <span></span>
        </div>
      </div>

      <br />
      <div className={s.sub}>
        <div className={s.subTitles}>
          <h5>Comentarios</h5>
          <span></span>
        </div>
      </div>
      <DisplayReview
        reviews={reviews}
        product_id={parseInt(id)}
        handlePost={handlePost}
      />
      <br />
      <Footer />
    </div>
  );
}

export default Details;
