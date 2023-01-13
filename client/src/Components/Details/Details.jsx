import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as actions from "../../redux/actions";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import s from "./Details.module.css";
import Carrusel from "../Carrusel/Carrusel";
import Dropdown from "../Dropdown/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DisplayReview from "./DisplayReview";
import {
  faHeart,
  faStar,
  // faTruck,
  // faStore,
} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';

function Details() {
  const { id } = useParams();
  const product = useSelector((state) => state.detail);
  const reviews = useSelector((state) => state.reviews);
  const cart = useSelector((state) => state.cart);
  const dm = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const history = useHistory();
  const initialLoad = useRef(true);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(product.stock);
  const [trigger, setTrigger] = useState(false);
  const flag = useRef(true);
  const idChange = useRef(id);
  const user = useSelector(state => state.loggedUser);
  let [active, setActive] = useState(product.favorite);

  useEffect(() => {
    if (idChange.current !== id) {
      dispatch(actions.getProductById(id));
      idChange.current = id;
    }

    if (initialLoad.current) {
      dispatch(actions.getProductById(id));
      dispatch(actions.getReviewsBy(id));
      initialLoad.current = false;
      return;
    }
    if (flag.current) {
      removeCartProductsFromProduct();
      flag.current = false;
    }
    setActive(product.favorite);
    setStock(product.stock);
    setQuantity(1);
  }, [product, reviews, trigger, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => dispatch(actions.cleanDetail());
  }, []);

  function removeCartProductsFromProduct() {
    const productFound = cart.find((p) => product.product_id === p.id);
    console.log(productFound);
    if (productFound) {
      // console.log('Entré')
      product.stock -= productFound.count;
    }
  }

  function handlePost(review) {
    dispatch(
      actions.postReview(review, () => {
        initialLoad.current = true;
        setTrigger(!trigger);
      })
    );
  }
  
  function handleAddToCart() {
    if(!user.user_id){
      Swal.fire({
        title: '¡Alerta!',
        text: 'Para agregar productos al carrito, necesitas ingresar a tu cuenta.',
        icon: 'warning',
        confirmButtonText: 'Iniciar sesión',
      }).then(response => {
        if (response.isConfirmed) history.push('/login')
      })
    }else{
      dispatch(
        actions.addCart({
          // user_id: user.user_id,
          product_id: product.product_id,
          // brand: product.brand,
          product_name: product.name,
          // image: product.image,
          price: product.price,
          // stock: product.stock,
          count: quantity,
        }, user.user_id)
      );
    }
  }

  function handleAddToFavorites() {
    if(!user.user_id){
      Swal.fire({
        title: '¡Alerta!',
        text: 'Para agregar productos a favoritos, necesitas ingresar a tu cuenta.',
        icon: 'warning',
        confirmButtonText: 'Iniciar sesión',
      }).then(response => {
        if (response.isConfirmed) history.push('/login')
      })
    } else {
      dispatch(
        actions.addFavorite({
          user_id: user.user_id,
          product_id: product.product_id,
        })
      );
      setActive(!active)
    }
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
    if (quantity > 1) {
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
    <div className={dm ? s.dmdetailPage : s.detailPage}>
      <NavBar />
      <section className={dm ? s.dmproductDetails : s.productDetails}>
        <div className={dm ? s.dmblock : s.block}>
          <div className={dm ? s.dmproductImage : s.productImage}>
            <div className={dm ? s.dmicon : s.icon}>
              <button className={active? s.favHeart : s.heart} onClick={handleAddToFavorites}>
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
            <div className={dm ? s.dmimgP : s.imgP}>
              <img src={product.image} alt={product.product_id} />
            </div>
          </div>
          <div className={dm ? s.dmproductInfo : s.productInfo}>
            <div>
              <Dropdown description={description} />
            </div>
          </div>
        </div>
        <div className={dm ? s.dmproductCart : s.productCart}>
          <span className={dm ? s.dmpId : s.pId}>
            ID Producto: {product.product_id}{" "}
          </span>
          <h2 className={dm ? s.dmpBrand : s.pBrand}>{product.brand}</h2>
          <h1 className={dm ? s.dmpName : s.pName}>{product.name}</h1>
          <div className={dm ? s.dmpScore : s.pScore}>
            {reviews && reviews.length ? (
              new Array(product.rating)
                .fill(undefined)
                .map((ele, idx) => <FontAwesomeIcon icon={faStar} key={idx} />)
            ) : (
              <span>Sin puntuación</span>
            )}
          </div>

          <hr />
          <h2 className={dm ? s.dmprice : s.price}>US${product.price}</h2>
          <div className={dm ? s.dmquantity : s.quantity}>
            <div>
              <button onClick={handleMinus}>-</button>&nbsp;&nbsp;&nbsp;&nbsp;
              {quantity}&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={handlePlus}>+</button>
            </div>
            <span className={dm ? s.dmstock : s.stock}>
              &nbsp;&nbsp;&nbsp;&nbsp;Stock disponible: {stock}{" "}
            </span>
          </div>
          <button
            type="submit"
            className={dm ? s.dmmainButton : s.mainButton}
            onClick={handleAddToCart}
          >
            Agregar al Carrito
          </button>
        </div>
      </section>

      <div className={dm ? s.dmsub : s.sub}>
        <div className={dm ? s.dmsubTitles : s.subTitles}>
          <h5>Recomendados</h5>
          <span></span>
        </div>
      </div>
      <Carrusel />
      <br />
      <div className={dm ? s.dmsub : s.sub}>
        <div className={dm ? s.dmsubTitles : s.subTitles}>
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