import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import s from './Error.module.css'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Error() {
    const history = useHistory();
    const handleClick = () => {
        history.push('/home');
    }
  
    const dm = useSelector(state => state.darkMode)
  return (
    <div className={dm ? s.dmePage : s.ePage}>
        <NavBar />
        <div className={dm ? s.dmerrorPage : s.errorPage}>
            <p className={dm ? s.dmmessage : s.message}>¡Oops! Esta página no existe</p>
            <div className={dm ? s.dmheroError : s.heroError}></div>
            <button className={dm ? s.dmmainButton : s.mainButton} onClick={handleClick}>Regresar al Home</button>
        </div>
        <Footer />
    </div>
  )
}

export default Error

//Agregar imágenes