import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../Footer/Footer'
import s from './Verify.module.css'
import { statusRegister } from '../../redux/actions'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Verify() {

    const { token } = useParams();
    const dispatch = useDispatch();
    const ta = useSelector(state => state.tokenAccepted)

    useEffect(()=>{
        dispatch(statusRegister((token)))
    },[])

    const history = useHistory();
    const handleLogin = () => {
        history.push('/login');
    }

    const handleRegister = () => {
        history.push('/register');
    }

  return (
    <div>
        { ta === 'FAIL' ? 
        <div>
            <h4>Validación Fallida</h4>
            <button onClick={handleRegister} >Registrarse Nuevamente</button>
        </div>: 
        <div>
            <h4>Validación Éxitosa</h4>
            <button onClick={handleLogin} >Inicie Sesión</button>
        </div>  }
        <Footer />      
    </div>
  )
}

export default Verify