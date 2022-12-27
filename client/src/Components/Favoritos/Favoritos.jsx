import React from 'react'
import { useSelector } from "react-redux";
import CardH from '../Card H/CardH';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import s from './Favoritos.module.css'

function Favoritos() {
    const favs = useSelector(state => state.favorites)
    return (
        <div>
            <NavBar />
            <section className={s.favSection}>
                {favs.length ? favs.map(p => <CardH 
                key={p.id} id={p.id}
                stock={p.stock} brand={p.brand}
                name={p.name} image={p.image} price={p.price}/>)
            : <p>Todavía no has agregado productos favoritos</p>}
            </section>
            <Footer/>
        </div>
    )
}

export default Favoritos