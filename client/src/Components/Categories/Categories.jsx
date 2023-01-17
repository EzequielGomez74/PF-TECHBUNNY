import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import s from './Categories.module.css';
import { useSelector } from 'react-redux';

function Categories() {
  const dm = useSelector(state => state.darkMode)

  return (
    <div className={dm ? s.dmcategoriesPage : s.categoriesPage}>
        <NavBar />
        <section className={dm ? s.dmcategories : s.categories}>
            <Link to= "/category/Equipos%20armados"><div>Equipos armados</div></Link>
            <Link to='/category/Notebooks'><div>Notebooks</div></Link>
            <Link to='/category/Fuentes%20y%20UPS'><div>Fuentes y UPS</div></Link>
            <Link to='/category/Procesadores'><div>Procesadores</div></Link>
            <Link to='/category/Memorias'><div>Memorias</div></Link>
            <Link to='/category/Tarjetas%20de%20video'><div>Tarjetas de video</div></Link>
            <Link to='/category/Monitores%20y%20TV'><div>Monitores y TV</div></Link>
            <Link to='/category/Pendrives'><div>Pendrives</div></Link>
            <Link to='/category/Consolas'><div>Consolas</div></Link>
            <Link to='/category/Gabinetes'><div>Gabinetes</div></Link>
            <Link to='/category/Motherboards'><div>Motherboards</div></Link>
            <Link to='/category/Cooling'><div>Cooling</div></Link>
            <Link to='/category/Almacenamiento'><div>Almacenamiento</div></Link>
            <Link to='/category/Periféricos'><div>Periféricos</div></Link>
            <Link to='/category/Sillas'><div>Sillas</div></Link>
            <Link to='/category/Impresoras'><div>Impresoras</div></Link>
        </section>
        <Footer />
    </div>
  )
}

export default Categories