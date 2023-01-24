import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
// import CardV from '../Card V/CardV';
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import s from "./Home.module.css";
import Carrusel from "../Carrusel/Carrusel";
import BannerHome from "../Banner Home/Banner";
import Newsletter from "../NewsLetter/Newsletter";
import { Link } from "react-router-dom";

function Home() {
  // const products = useSelector(state => state.products)
  const dispatch = useDispatch();
  const favoritesCarrousel = useSelector((state) => state.favoritesCarrousel);
  const ordersCarrousel = useSelector((state) => state.ordersCarrousel);
  const products = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(actions.getProducts());
    dispatch(actions.getCarrousel("favorites"));
    dispatch(actions.getCarrousel("orders"));
  }, [dispatch]);

  const dm = useSelector((state) => state.darkMode);

  function setCarrouselProducts(carrousel) {
    for (let i = 0; i < carrousel.length; i++) {
      if (carrousel[i] === null) {
        const pos = Math.floor(Math.random() * 820);
        carrousel[i] = products[pos];
      }
    }
    return carrousel;
  }

  return (
    <div className={dm ? s.dmhome : s.home}>
      <NavBar />
      <BannerHome />
      <div className={s.sub}>
        <div className={dm ? s.dmsubTitles : s.subTitles}>
          <h5>Recomendados</h5>
          <span></span>
        </div>
      </div>

      <Carrusel products={setCarrouselProducts(favoritesCarrousel)} />

      <section className={dm ? s.dmbanners : s.banners}>
        <div className={s.bannerOne}>
          <Link to="/category/Periféricos">
            <div className={s.a}></div>
          </Link>
          <Link to="/category/Sillas">
            <div className={s.b}></div>
          </Link>
          <Link to="/category/Impresoras">
            <div className={s.c}></div>
          </Link>
        </div>
        <div className={s.bannerTwo}>
          <Link to="/category/Notebooks">
            <div className={s.d}></div>
          </Link>
          <Link to="/category/Cooling">
            <div className={s.e}></div>
          </Link>
          <Link to="/category/Consolas">
            <div className={s.f}></div>
          </Link>
        </div>
      </section>

      <div className={s.sub}>
        <div className={dm ? s.dmsubTitles : s.subTitles}>
          <h5>Los más vendidos</h5>
          <span></span>
        </div>
      </div>

      <Carrusel products={setCarrouselProducts(ordersCarrousel)} />

      {/* Marcas */}
      <section className={dm ? s.dmbanners : s.banners}>
        <div className={s.bannerOne}>
          <Link to="/brand/Razer">
            <div className={s.razer}></div>
          </Link>
          <Link to="/brand/HyperX">
            <div className={s.hyperx}></div>
          </Link>
          <Link to="/brand/Logitech">
            <div className={s.logitech}></div>
          </Link>
        </div>
        <div className={s.bannerTwo}>
          <Link to="/brand/Redragon">
            <div className={s.redragon}></div>
          </Link>
          <Link to="/brand/Cooler master">
            <div className={s.coolermaster}></div>
          </Link>
          <Link to="/brand/Nintendo">
            <div className={s.nintendo}></div>
          </Link>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
