import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions'
import CardV from '../Card V/CardV';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import s from './Home.module.css';

function Home() {
  const products = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(actions.getProducts());
  }, [dispatch])

  return (
    <div className={s.home}>
        <NavBar />
        <div className={s.heroSection}>
          <div className={s.hero}>
            <div className={s.heroImg}></div>
            <div>¡Todo lo que buscas,<br /> en un solo lugar!</div>
          </div>
        </div>

        <section>
          {products ? products.map(p => <CardV 
          key={p.product_id}
          id={p.product_id}
          brand={p.brand}
          name={p.name}
          image={p.image}
          price={p.price}
          category={p.category}
          subcategory={p.subcategory}
          />) : 'No hay productos'}
        </section>
        <section className={s.banners} >
            <div className={s.bannerOne}>
                <div className={s.a}></div>
                <div className={s.b}></div>
                <div className={s.c}></div>
            </div>
            <div className={s.bannerTwo}>
                <div className={s.d}></div>
                <div className={s.e}></div>
                <div className={s.f}></div>
            </div>
        </section>
        <Footer/>
    </div>
  )
}

export default Home