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
// import Carrusel from '../Carrusel/Carrusel';
import CardV from '../Card V/CardV';

function Details() {
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

// Inicio de Carrusel Propio
const testProducts = [
  {
  "product_id": 1,
  "name": "Equipo AMD Athlon 3000G – 8Gb – SSD – Radeon™ Vega 3 Graphics",
  "image": "https://thotcomputacion.com.uy/wp-content/uploads/2015/07/ath.jpg",
  "price": "325",
  "stock": 12,
  "soldCount": 5,
  "brand": "Amd",
  "subcategory": "Equipos AMD",
  "category": "Equipos armados",
  "active": true
  },
  {
  "product_id": 2,
  "name": "Equipo AMD Athlon 3000G Gamer – Radeon™ Vega 3 Graphics",
  "image": "https://thotcomputacion.com.uy/wp-content/uploads/2015/01/3-1.jpg",
  "price": "375",
  "stock": 2,
  "soldCount": 5,
  "brand": "Amd",
  "subcategory": "Equipos AMD",
  "category": "Equipos armados",
  "active": true
  },
  {
  "product_id": 3,
  "name": "Equipo AMD Ryzen 3 4350G Pro Gamer – Radeon Graphics",
  "image": "https://thotcomputacion.com.uy/wp-content/uploads/2015/01/3-1.jpg",
  "price": "575",
  "stock": 7,
  "soldCount": 5,
  "brand": "Amd",
  "subcategory": "Equipos AMD",
  "category": "Equipos armados",
  "active": true
  },
  {
  "product_id": 4,
  "name": "Equipo AMD Ryzen 5 4650G Pro Gamer – Radeon Graphics",
  "image": "https://thotcomputacion.com.uy/wp-content/uploads/2022/01/AMD-1-1-1-600x602.png",
  "price": "625",
  "stock": 2,
  "soldCount": 6,
  "brand": "Amd",
  "subcategory": "Equipos AMD",
  "category": "Equipos armados",
  "active": true
  },
  {
  "product_id": 5,
  "name": "Equipo AMD Ryzen 5 5600G Gamer – Radeon Graphics",
  "image": "https://thotcomputacion.com.uy/wp-content/uploads/2022/01/AMD-1-1-1-600x602.png",
  "price": "675",
  "stock": 18,
  "soldCount": 5,
  "brand": "Amd",
  "subcategory": "Equipos AMD",
  "category": "Equipos armados",
  "active": true
  },
  {
  "product_id": 6,
  "name": "Equipo AMD Ryzen 7 5700G Pro Gamer – 16Gb – SSD – Radeon Graphics",
  "image": "https://thotcomputacion.com.uy/wp-content/uploads/2016/11/AMD-1-1-600x602.png",
  "price": "900",
  "stock": 4,
  "soldCount": 7,
  "brand": "Amd",
  "subcategory": "Equipos AMD",
  "category": "Equipos armados",
  "active": true
  },
  {
  "product_id": 7,
  "name": "Equipo AMD Ryzen 5 3600 Pro Gamer con GTX1650",
  "image": "https://thotcomputacion.com.uy/wp-content/uploads/2017/07/AMD-5-1-600x602.jpg",
  "price": "1090",
  "stock": 4,
  "soldCount": 7,
  "brand": "Amd",
  "subcategory": "Equipos AMD",
  "category": "Equipos armados",
  "active": true
  },
  {
  "product_id": 8,
  "name": "Equipo AMD Ryzen 5 3600 Full Gamer  – 16Gb – SSD –  GTX1660",
  "image": "https://thotcomputacion.com.uy/wp-content/uploads/2017/07/AMD-5-1-600x602.jpg",
  "price": "1350",
  "stock": 12,
  "soldCount": 5,
  "brand": "Amd",
  "subcategory": "Equipos AMD",
  "category": "Equipos armados",
  "active": true
  },
  {
  "product_id": 9,
  "name": "Equipo AMD Ryzen 5 3600 Full Gamer – 16Gb – RX6500XT",
  "image": "https://thotcomputacion.com.uy/wp-content/uploads/2021/10/xz10r-600x600.jpg",
  "price": "1599.99",
  "stock": 9,
  "soldCount": 5,
  "brand": "Amd",
  "subcategory": "Equipos AMD",
  "category": "Equipos armados",
  "active": true
}]


//____________________________

const [currentPage, setCurrentPage] = useState(1);
const [productsPerPage] = useState(6);



const indexOfLastProduct = currentPage * productsPerPage
const indexOfFirstProduct = indexOfLastProduct - productsPerPage

const currentProducts = testProducts.slice(indexOfFirstProduct,indexOfLastProduct);
const pageNumber = Math.ceil(testProducts.length / productsPerPage);

// Change Page
  const next = () =>{
      if(currentPage < pageNumber) setCurrentPage(currentPage + 1);
      else setCurrentPage(1);
  }
  const back = () =>{
      if(currentPage !== 1) setCurrentPage(currentPage - 1);
      else setCurrentPage(pageNumber);
  }

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
    <div className={s.detailPage}>
      <NavBar />
      <section className={s.productDetails}>
        <div className={s.block}>
          <div className={s.productImage}>
            <div className={s.icon}>
              <button onClick={()=> dispatch(actions.addFavorite({id: product.product_id, brand:product.brand , name: product.name, image:product.image, price:product.price, stock: product.stock})) } className={s.heart}><FontAwesomeIcon icon={faHeart}/></button>
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
        <div className={s.productCart} >
          <span className={s.pId} >ID Producto: {product.product_id} </span>
          <h2 className={s.pBrand}>{product.brand}</h2>
          <h1 className={s.pName}>{product.name}</h1>

          <div className={s.pScore}>
            {comments.length ? new Array(averageReview(comments)).fill(undefined).map((ele, idx)=>(
              <FontAwesomeIcon icon={faStar} key={idx} />
            )) : <span>Sin puntuación</span> }
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
            <span className={s.stock} >&nbsp;&nbsp;&nbsp;&nbsp;Stock disponible: {parseInt(stock)} </span>
          </div>
          <button type='submit' className={s.mainButton} onClick={()=> dispatch(actions.addCart({id:product.product_id, brand:product.brand , name:product.name, image:product.image, price:product.price, stock: product.stock, totalQuantity:quantity}))} >Agregar al Carrito</button>
        </div>
      </section>

      <div className={s.sub}>
        <div className={s.subTitles}>
          <h5>Recomendados</h5>
          <span></span>
        </div>
      </div>

      <section className={s.carruselSection}>
        <div className={s.carrusel}>
          <div className={s.currentProducts}>
            {currentProducts.map(p =><CardV
                key={p.product_id}
                id={p.product_id}
                brand={p.brand}
                name={p.name}
                image={p.image}
                price={p.price}
                stock={p.stock}
                category={p.category}
                subcategory={p.subcategory}
            />) }
          </div>
          <div className={s.pagination}>
              { currentPage === 1 ?                              
              <div className={s.pagbutton} >
                  <button className={s.disabled} disabled>Back</button>
                  <button className={s.next} onClick={next} >Next</button>
              </div> :                             
              <div className={s.pagbutton} >
                  <button className={s.back} onClick={back} >Back</button>
                  <button className={s.next} onClick={next} >Next</button>
              </div>}
          </div>
          {/* <Carrusel /> */}
        </div>
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
          <h5><strong>Cantidad de comentarios:</strong> &nbsp;&nbsp; {comments.length}</h5>
          <hr />        
          <div>
            {/* Sección que muestra comentarios existentes */}
            {comments.length? comments.map(c => (
            <div className={s.newComment}>
              <span className={s.userId}><strong>Por:</strong></span>
              <span className={s.rating} >{c.rating} </span>
              <p className={s.review}>{c.review}</p>
              <hr />
            </div>)) : <p className={s.noReview}>Este producto aún no tiene reseñas. ¡Sé el primero en compartirnos tu opinión!</p>  }
            
            {/* Sección de para crear comentarios */}
            

            <form className={s.cForm} onSubmit={handleSubmit}>
              <div>
                <label className={s.label}>Valoración de tu compra&nbsp;&nbsp;&nbsp;&nbsp;</label>
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
              <input className={s.mainButton} type="submit" value="Agregar Comentario" />
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