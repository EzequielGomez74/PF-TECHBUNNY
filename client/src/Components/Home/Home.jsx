import React, { useEffect } from 'react';
import { useDispatch, useSelector,  } from 'react-redux';
import * as actions from '../../redux/actions'
// import CardV from '../Card V/CardV';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import s from './Home.module.css';
import Carrusel from '../Carrusel/Carrusel';
import BannerHome from '../Banner Home/Banner'
import Newsletter from '../NewsLetter/Newsletter'


function Home() {
  // const products = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(actions.getProducts());
  }, [dispatch])

  return (
    <div className={s.home}>
        <NavBar />
        <BannerHome/>
        <div className={s.sub}>
        <div className={s.subTitles}>
          <h5>Recomendados</h5>
          <span></span>
        </div>
      </div>
        <Carrusel />
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

        <div className={s.sub}>
        <div className={s.subTitles}>
          <h5>Recomendados</h5>
          <span></span>
        </div>
      </div>

        <Carrusel/>
        <Newsletter/>
        <Footer/>
        
    </div>
  )
}

export default Home