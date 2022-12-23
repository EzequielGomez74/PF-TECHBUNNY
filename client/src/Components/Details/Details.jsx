import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import * as actions from '../../redux/actions'
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import s from './Details.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faStar, faTruck, faStore} from "@fortawesome/free-solid-svg-icons";
import Dropdown from '../Dropdown/Dropdown';

function Details() {
  const { id } = useParams()
  const product = useSelector(state => state.detail);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(actions.getProductById(id))
  },[dispatch,id])


  const [quantity, setQuantity] = useState(0)
  const [stock, setStock]= useState(product.stock)
  const handlePlus = () =>{
    if(quantity < product.stock){
      setQuantity(quantity+1);
      setStock(stock-1);
    }
  }

  const handleMinus = ()=>{
    if(quantity> 0){
      setQuantity(quantity-1);
      setStock(stock+1)
    }
  }
  
  const description = product.description?.map(ele => {
    const key = Object.keys(ele)[0];
    const value = Object.values(ele)[0];

    switch (key) {
      case 'ul':
        return (<ul>{value.map(data => {
          return <li>{data}</li>
        })}</ul>);
      case 'p':
        return <p>{value}</p>            
      default:
        return <br />;
    }
  })

  // const [input, setInput] = useState('')
  // const [comments, setComments] = useState([])

  // const handleInputChange = (e) => {
  //   setInput(e.target.value)
  // }

  // const handleNewComment = () => {
  //   setComments([...comments, input]);
  //   setInput('');
  // }

  return (
    <div className={s.detailPage}>
      <NavBar />
      <section className={s.productDetails}>
        <div className={s.block}>
          <div className={s.productImage}>
            <FontAwesomeIcon icon={faHeart} className={s.heart} />
            <img src={product.image} alt={product.product_id} />
          </div>
          <div className={s.productInfo}>
            <div>
              <Dropdown description={description} />
            </div>
          </div>
        </div>
        <div className={s.productCart} >
          <span className={s.pId} >ID Producto: {product.product_id} </span>
          <h2 className={s.pBrand}>{product.brand}</h2>
          <h1 className={s.pName}>{product.name}</h1>

          <div className={s.pScore}>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div className={s.delivery}>
            <h3>Tipo de Entrega</h3>
            <div>
              <input type="radio" id="contactChoice1" name="contact" value="email" />
              <label>&nbsp;&nbsp;<FontAwesomeIcon icon={faTruck} /> &nbsp;&nbsp;Despacho a domicilio </label>
            </div>
            <div>
              <input type="radio" id="contactChoice1" name="contact" value="email" />
              <label>&nbsp;&nbsp;<FontAwesomeIcon icon={faStore} /> &nbsp;&nbsp;Retiro en tienda </label>
            </div>
          </div>
          <hr />
          <h2 className={s.price}>US${product.price}</h2>
          <div className={s.quantity} >
            <div>
              <button onClick={handleMinus} >-</button>&nbsp;&nbsp;&nbsp;&nbsp;{quantity}&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={handlePlus}>+</button>
            </div>
            <span className={s.stock} >&nbsp;&nbsp;&nbsp;&nbsp;Stock disponible: {stock} </span>
          </div>
          <button type='submit' className={s.mainButton}>Agregar al Carrito</button>
        </div>
      </section>
      <section>
        CARRUSEL
      </section>
      <section>
        <div>
          <div>
            <h5>Calificación general:</h5>
            <span>0 comentarios</span> 
            {/* Esto tiene que ser dinamico */}
          </div>
          <hr />
          {/* investigaa cómo hacer que las estrellas se muestren */}
          <input type="text" placeholder='Escribe un comentario sobre tu compra' />
          <button>AGREGAR COMENTARIO</button>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Details