import React from 'react'
import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'
import { useSelector } from 'react-redux'
import CardV from '../Card V/CardV'
import s from './Results.module.css'


function Results() {
    const results = useSelector(state => state.results2)
    const st = useSelector(state => state.searchTerm)


    return (
        <div className={s.Results}>
            <NavBar />
            <section className={s.resultsPage}>
                <div className={s.resultsMessage}>
                    <h4> {results.length} Resultados de búsqueda para: ''{st}''</h4>
                </div>
                <div className={s.resultsCards}>
                    { results.length ? results.map(p => <CardV
                        key= {p.product_id}
                        id= {p.product_id}
                        brand= {p.brand}
                        name = {p.name}
                        image= {p.image}
                        price= {p.price}
                        category= {p.category}
                        subcategory= {p.subcategory}
                        /> ) 
                    : <span> No hay resultados </span>}
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Results