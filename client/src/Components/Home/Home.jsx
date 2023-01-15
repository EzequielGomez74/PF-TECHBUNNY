import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions'
// import CardV from '../Card V/CardV';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import s from './Home.module.css';
import Carrusel from '../Carrusel/Carrusel';
import BannerHome from '../Banner Home/Banner'
import Newsletter from '../NewsLetter/Newsletter'
import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Home() {
  // const products = useSelector(state => state.products)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(actions.getProducts());
  }, [dispatch])

  const dm = useSelector(state => state.darkMode);

  const dm = useSelector(state => state.darkMode);

  return (
    <div className={dm ? s.dmhome : s.home} >
    <div className={dm ? s.dmhome : s.home} >
        <NavBar />
        <BannerHome/>
        <div className={s.sub}>
        <div className={dm ? s.dmsubTitles : s.subTitles}>
        <div className={dm ? s.dmsubTitles : s.subTitles}>
          <h5>Recomendados</h5>
          <span></span>
        </div>
      </div>
        <Carrusel />
        <section className={dm ? s.dmbanners : s.banners} >
        <Carrusel />
        <section className={dm ? s.dmbanners : s.banners} >
            <div className={s.bannerOne}>
                <Link to='/category/Periféricos'>
                <Link to='/category/Periféricos'>
                <div className={s.a}></div>
                </Link>
                <Link to='/category/Sillas'>
                </Link>
                <Link to='/category/Sillas'>
                <div className={s.b}></div>
                </Link>
                <Link to='/category/Impresoras'>
                </Link>
                <Link to='/category/Impresoras'>
                <div className={s.c}></div>
                </Link>
                </Link>
            </div>
            <div className={s.bannerTwo}>
                <Link to='/category/Notebooks'>
                <div className={s.d}></div>
                </Link>
                <Link to='/category/Cooling'>
                <div className={s.e}></div>
                </Link>
                <Link to='/category/Consolas'>
                <div className={s.f}></div>
                </Link>
                </Link>
            </div>
        </section>

        <div className={s.sub}>
        <div className={dm ? s.dmsubTitles : s.subTitles}>
        <div className={dm ? s.dmsubTitles : s.subTitles}>
          <h5>Recomendados</h5>
          <span></span>
        </div>
      </div>

        <Carrusel/>
        <Carrusel/>
        <Newsletter/>
        <Footer/>
        
    </div>
  )
}

export default Home