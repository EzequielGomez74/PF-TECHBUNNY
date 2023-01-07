import React from 'react'
import { useSelector } from "react-redux";
import CardH from '../Card H/CardH';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import s from './Favoritos.module.css'
import favorito from '../../Photos/favorito.png'


function Favoritos() {

    //dark mode
  const dm = useSelector(state => state.darkMode);

    const favs = useSelector(state => state.favorites)
    return (
        <div>
            <NavBar />
            <section className={dm ? s.dmfavSection : s.favSection}>
                {favs.length ? favs.map(p => <CardH 
                key={p.id} id={p.id}
                stock={p.stock} brand={p.brand}
                name={p.name} image={p.image} price={p.price}/>)
            : 
            <div>
                {/* <div className={dm ? s.dmheroFav : s.heroFav}></div> */}
               <img className={s.favorito} src={favorito} alt=""></img>
                <p className={dm ? s.dmmessage : s.message}>¡Todavía no has agregado productos favoritos!</p>
            </div>}
            </section>
            <Footer/>
        </div>
    )
}

export default Favoritos