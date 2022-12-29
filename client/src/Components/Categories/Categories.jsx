import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import s from './Categories.module.css';

function Categories() {
  return (
    <div>
        <NavBar />
        <section>
            <Link to= "/category/Equipos%20armados"><div>Equipos armados</div></Link>
            <Link to='/category/Notebooks'><div>Notebooks</div></Link>
            <Link to='/category/Notebooks'><div>Fuentes y UPS</div></Link>
            <Link to='/category/Notebooks'><div>Procesadores</div></Link>
            <Link to='/category/Notebooks'><div>Memorias</div></Link>
            <Link to='/category/Notebooks'><div>Tarjetas de video</div></Link>
            <Link to='/category/Notebooks'><div>Monitores y TV</div></Link>
            <Link to='/category/Notebooks'><div>Pendrives</div></Link>
            <Link to='/category/Notebooks'><div>Consolas</div></Link>
            <Link to='/category/Notebooks'><div>Gabinetes</div></Link>
            <Link to='/category/Notebooks'><div>Motherboards</div></Link>
            <Link to='/category/Notebooks'><div>Cooling</div></Link>
            <Link to='/category/Notebooks'><div>Almacenamiento</div></Link>
            <Link to='/category/Notebooks'><div>Periféricos</div></Link>
            <Link to='/category/Notebooks'><div>Sillas</div></Link>
            <Link to='/category/Notebooks'><div>Impresoras</div></Link>
        </section>
        <Footer />
    </div>
  )
}

export default Categories