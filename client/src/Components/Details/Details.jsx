import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import * as actions from '../../redux/actions'
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import s from './Details.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faStar, faTruck, faStore, faReceipt} from "@fortawesome/free-solid-svg-icons";

function Details() {
  const { id } = useParams()
  const product = useSelector(state => state.detail);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(actions.getProductById(id))
  },[dispatch,id])


  const [quantity, setQuantity] = useState(0)
  const handlePlus = () =>{
    if(quantity < product.stock){
      setQuantity(quantity+1);
    }
  }

  const handleMinus = ()=>{
    if(quantity> 0){
      setQuantity(quantity-1)
    }
  }
  
  const [input, setInput] = useState('')
  const [comments, setComments] = useState([])

  // const handleInputChange = (e) => {
  //   setInput(e.target.value)
  // }

  // const handleNewComment = () => {
  //   setComments([...comments, input]);
  //   setInput('');
  // }
 
  return (
    <div>
      <NavBar />
      <section>
        <div>
          <FontAwesomeIcon icon={faHeart} />
          <img src={product.image} alt={product.product_id} />
        </div>
        <div>
          <h2>{product.brand}</h2>
          <h1>{product.name}</h1>
          <div>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div>{product.description?.map(ele => {
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
          })}</div>
          <div>
            <h3>Tipo de Entrega</h3>
            <input type="radio" id="contactChoice1" name="contact" value="email" />
            <label><FontAwesomeIcon icon={faTruck} /> &nbsp;&nbsp;Despacho a Domicilio </label>

            <input type="radio" id="contactChoice1" name="contact" value="email" />
            <label><FontAwesomeIcon icon={faStore} /> &nbsp;&nbsp;Retiro en tienda </label>
          </div>
        </div>
        <form>
          <span>ID Producto: {product.product_id} </span>
          <h6>Envío gratis</h6>
          <hr />
          <h2>US${product.price}</h2>
          <div>
            <div>
              <button onClick={handleMinus} >-</button>{quantity}<button onClick={handlePlus}>+</button>
            </div>
            <p>Stock disponible: {product.stock} </p>
          </div>
          <h5><FontAwesomeIcon icon={faReceipt} /> &nbsp;&nbsp; Disponible con Mercado Pago</h5>
          <button type='submit'>Agregar al Carrito</button>
        </form>
      </section>
      <section>
        CARRUSEL
      </section>
      <section>
        <div>
          <div>
            <h5>Calificación general:</h5>
            <span>{comments.length} comentarios</span> 
            {/* Esto tiene que ser dinamico */}
          </div>
          <hr />
          {/* investigaa cómo hacer que las estrellas se muestren */}
          <input type="text" value={input} placeholder='Escribe un comentario sobre tu compra' />
          <button>Agregar Comentario</button>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Details