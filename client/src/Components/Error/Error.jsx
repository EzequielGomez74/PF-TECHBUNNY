import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

function Error() {
  return (
    <div>
        <NavBar />
        <div>
            <p>404</p>
            <div></div>
            <p>Esta página no existe</p>
            <button>Regresar al Home</button>
        </div>
        <Footer />
    </div>
  )
}

export default Error

//Agregar imágenes