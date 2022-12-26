import React from 'react'
import { useSelector } from "react-redux";
import CardV from '../Card V/CardV';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';

function Favoritos() {
    const favs = useSelector(state => state.favorites)
    return (
        <div>
            <NavBar />
            {favs.length ? favs.map(p => <CardV 
                key={p.id}
                id={p.id}
                brand={p.brand}
                name={p.name}
                image={p.image}
                price={p.price}
            />)
            : <p>'Todavía no has agregado productos favoritos'</p>}
            <Footer/>
        </div>
    )
}

export default Favoritos