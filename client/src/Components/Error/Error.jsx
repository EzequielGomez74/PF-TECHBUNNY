import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import s from './Error.module.css'
import { useHistory } from 'react-router-dom';

function Error() {
    const history = useHistory();
    const handleClick = () => {
        history.push('/home');
    }

  return (
    <div>
        <NavBar />
        <div className={s.errorPage}>
            <p className={s.message}>¡Oops! Esta página no existe</p>
            <div className={s.heroError}></div>
            <button className={s.mainButton} onClick={handleClick}>Regresar al Home</button>
        </div>
        <Footer />
    </div>
  )
}

export default Error

//Agregar imágenes