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
import Carrusel from '../Carrusel/Carrusel';
import CardV from '../Card V/CardV';

function Details() {

  const dm = useSelector(state => state.darkMode);

  const { id } = useParams()
  const product = useSelector(state => state.detail);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(actions.getProductById(id))
  },[dispatch,id])


  const [quantity, setQuantity] = useState(0)
  const [stock, setStock]= useState(parseInt(product.stock))
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


// Inicio de Lógica Comentarios
  const [score, setScore] = useState({
    rating: '',
    review:'',
  })
  const [comments, setComments] = useState([])

  const handleChange = (e) => {
    setScore({
      ...score,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setComments([...comments, score])
    setScore({
      rating:'',
      review:'',
    })
  }

  const averageReview = (c) => {
    const numbers = []
    for (let i = 0; i < c.length; i++) {
      if(c[i].rating === '★☆☆☆☆') numbers.push(1);        
      if(c[i].rating === '★★☆☆☆') numbers.push(2);        
      if(c[i].rating === '★★★☆☆') numbers.push(3);        
      if(c[i].rating === '★★★★☆') numbers.push(4);        
      if(c[i].rating === '★★★★★') numbers.push(5);        
    }
    const sum = numbers.reduce((prev, curr) => prev + curr);
    const average = Math.ceil(sum/c.length);
    return average
  }

// Fin de Lógica Comentarios

  return (
    <div className={dm? s.dmdetailPage : s.detailPage}>
      <NavBar />
      <section className={dm? s.dmproductDetails : s.productDetails}>
        <div className={dm? s.dmblock : s.block}>
          <div className={dm? s.dmproductImage : s.productImage}>
            <div className={dm? s.dmicon : s.icon}>
              <button onClick={()=> dispatch(actions.addFavorite({id: product.product_id, brand:product.brand , name: product.name, image:product.image, price:product.price, stock: product.stock})) } className={s.heart}><FontAwesomeIcon icon={faHeart}/></button>
            </div>
            <div className={dm? s.dmimgP : s.imgP}>
              <img src={product.image} alt={product.product_id} />
            </div>
          </div>
          <div className={dm? s.dmproductInfo : s.productInfo}>
            <div>
              <Dropdown description={description} />
            </div>
          </div>
        </div>
        <div className={dm? s.dmproductCart : s.productCart} >
          <span className={dm? s.dmpId : s.pId} >ID Producto: {product.product_id} </span>
          <h2 className={dm? s.dmpBrand : s.pBrand}>{product.brand}</h2>
          <h1 className={dm? s.dmpName : s.pName}>{product.name}</h1>

          <div className={dm? s.dmpScore : s.pScore}>
            {comments.length ? new Array(averageReview(comments)).fill(undefined).map((ele, idx)=>(
              <FontAwesomeIcon icon={faStar} key={idx} />
            )) : <span>Sin puntuación</span> }
          </div>
         
          <hr />
          <h2 className={dm? s.dmprice : s.price}>US${product.price}</h2>
          <div className={dm? s.dmquantity : s.quantity} >
            <div>
              <button onClick={handleMinus} >-</button>&nbsp;&nbsp;&nbsp;&nbsp;{quantity}&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={handlePlus}>+</button>
            </div>
            <span className={dm? s.dmstock : s.stock} >&nbsp;&nbsp;&nbsp;&nbsp;Stock disponible: {parseInt(stock)} </span>
          </div>
          <button type='submit' className={dm? s.dmmainButton : s.mainButton} onClick={()=> dispatch(actions.addCart({id:product.product_id, brand:product.brand , name:product.name, image:product.image, price:product.price, stock: product.stock, totalQuantity:quantity}))} >Agregar al Carrito</button>
        </div>
      </section>

      <div className={dm? s.dmsub : s.sub}>
        <div className={dm? s.dmsubTitles : s.subTitles}>
          <h5>Recomendados</h5>
          <span></span>
        </div>
      </div>
      
          <Carrusel />
      
      <br />
      <div className={dm? s.dmsub : s.sub}>
        <div className={dm? s.dmsubTitles : s.subTitles}>
          <h5>Comentarios</h5>
          <span></span>
        </div>
      </div>
      
      <section className={dm? s.dmcommentSection : s.commentSection}>
        <div className={dm? s.dmallComments : s.allComments}>
          <h5><strong>Cantidad de comentarios:</strong> &nbsp;&nbsp; {comments.length}</h5>
          <hr />        
          <div>
            {/* Sección que muestra comentarios existentes */}
            {comments.length? comments.map(c => (
            <div className={dm? s.dmnewComment : s.newComment}>
              <span className={dm? s.dmuserId : s.userId}><strong>Por:</strong></span>
              <span className={dm? s.dmrating : s.rating} >{c.rating} </span>
              <p className={dm? s.dmreview : s.review}>{c.review}</p>
              <hr />
            </div>)) : <p className={dm? s.dmnoReview : s.noReview}>Este producto aún no tiene reseñas. ¡Sé el primero en compartirnos tu opinión!</p>}
            
            {/* Sección de para crear comentarios */}
            

            <form className={dm? s.dmcForm : s.cForm} onSubmit={handleSubmit}>
              <div>
                <label className={dm? s.dmlabel : s.label}>Valoración de tu compra&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <select name="rating" value={score.rating} onChange={handleChange} >
                  <option>seleccionar</option>
                  <option value="★☆☆☆☆">★☆☆☆☆</option>
                  <option value="★★☆☆☆">★★☆☆☆</option>
                  <option value="★★★☆☆">★★★☆☆</option>
                  <option value="★★★★☆">★★★★☆</option>
                  <option value="★★★★★">★★★★★</option>
                </select>
              </div>
              <textarea rows="5" name="review" value={score.review} placeholder='Escribe un comentario sobre tu compra' onChange={handleChange} />
              <br />
              <input className={dm? s.dmmainButton : s.mainButton} type="submit" value="Agregar Comentario" />
            </form>
          </div>
        </div>
      </section>
      <br />
      <Footer />
    </div>
  )
}

export default Details

//Extra al formulario de comentario
// Faltan las validaciones del formulario. Es necesario que cuando se clickee el boton, se haya recibido todo, es decir, user_id, product_id, review y rating.

// Recordatorio
// Cuando se terminé el formulario de comentarios(se recibe por body el user_id, product_id, review y rating) se debe despachar un action creator CREATE_COMMENT(user_id,product_id, review, rating)
// Para ver todos loss comentarios de un producto se debe llamar a la action creator GET_PRODUCT_COMMENTS(product_id)