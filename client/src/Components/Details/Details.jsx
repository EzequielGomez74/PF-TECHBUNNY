import React, { useEffect, useState } from "react";
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
import Carrusel from "../Carrusel/Carrusel";

function Details() {
  const { id } = useParams();
  const product = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getProductById(id));
    console.log(product);
    console.log(stock);
  }, [dispatch, id]);

  const [quantity, setQuantity] = useState(0);
  const [stock, setStock] = useState(product.stock);

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

  const [score, setScore] = useState({
    rating: "",
    review: "",
  });
  const [comments, setComments] = useState([]);

  const handleChange = (e) => {
    setScore({
      ...score,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, score]);
    setScore({
      rating: "",
      review: "",
    });
  };

  const averageReview = (c) => {
    const numbers = [];
    for (let i = 0; i < c.length; i++) {
      if (c[i].rating === "★☆☆☆☆") numbers.push(1);
      if (c[i].rating === "★★☆☆☆") numbers.push(2);
      if (c[i].rating === "★★★☆☆") numbers.push(3);
      if (c[i].rating === "★★★★☆") numbers.push(4);
      if (c[i].rating === "★★★★★") numbers.push(5);
    }
    const sum = numbers.reduce((prev, curr) => prev + curr);
    const average = Math.ceil(sum / c.length);
    return average;
  };

  // Fin de Lógica Comentarios

  return (
    <div className={s.detailPage}>
      <NavBar />
      <section className={s.productDetails}>
        <div className={s.block}>
          <div className={s.productImage}>
            <div className={s.icon}>
              <FontAwesomeIcon icon={faHeart} className={s.heart} />
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
            {comments.length ? (
              new Array(averageReview(comments))
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
              &nbsp;&nbsp;&nbsp;&nbsp;Stock disponible: {parseInt(stock)}{" "}
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

      <section className={s.carruselSection}>
        <br />
        <br />
        <Carrusel />
      </section>

      <br />
      <div className={s.sub}>
        <div className={s.subTitles}>
          <h5>Comentarios</h5>
          <span></span>
        </div>
      </div>

      <section className={s.commentSection}>
        <div className={s.allComments}>
          <h5>
            <strong>Cantidad de comentarios:</strong> &nbsp;&nbsp;{" "}
            {comments.length}
          </h5>
          <hr />
          <div>
            {/* Sección que muestra comentarios existentes */}
            {comments.length ? (
              comments.map((c) => (
                <div className={s.newComment}>
                  <span className={s.userId}>
                    <strong>Por:</strong>
                  </span>
                  <span className={s.rating}>{c.rating} </span>
                  <p className={s.review}>{c.review}</p>
                  <hr />
                </div>
              ))
            ) : (
              <p className={s.noReview}>
                Este producto aún no tiene reseñas. ¡Sé el primero en
                compartirnos tu opinión!
              </p>
            )}

            {/* Sección de para crear comentarios */}

            <form className={s.cForm} onSubmit={handleSubmit}>
              <div>
                <label className={s.label}>
                  Valoración de tu compra&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <select
                  name="rating"
                  value={score.rating}
                  onChange={handleChange}
                >
                  <option>seleccionar</option>
                  <option value="★☆☆☆☆">★☆☆☆☆</option>
                  <option value="★★☆☆☆">★★☆☆☆</option>
                  <option value="★★★☆☆">★★★☆☆</option>
                  <option value="★★★★☆">★★★★☆</option>
                  <option value="★★★★★">★★★★★</option>
                </select>
              </div>
              <textarea
                rows="5"
                name="review"
                value={score.review}
                placeholder="Escribe un comentario sobre tu compra"
                onChange={handleChange}
              />
              <br />
              <input
                className={s.mainButton}
                type="submit"
                value="Agregar Comentario"
              />
            </form>
          </div>
        </div>
      </section>
      <br />
      <Footer />
    </div>
  );
}

export default Details;

//Extra al formulario de comentario
// Faltan las validaciones del formulario. Es necesario que cuando se clickee el boton, se haya recibido todo, es decir, user_id, product_id, review y rating.

// Recordatorio
// Cuando se terminé el formulario de comentarios(se recibe por body el user_id, product_id, review y rating) se debe despachar un action creator CREATE_COMMENT(user_id,product_id, review, rating)
// Para ver todos loss comentarios de un producto se debe llamar a la action creator GET_PRODUCT_COMMENTS(product_id)
