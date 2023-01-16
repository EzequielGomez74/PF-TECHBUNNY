import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import s from './Feedback.module.css'


function Feedback() {
    let location = useLocation();
    const history = useHistory();
    const handleClick = () => {
        history.push('/home');
    }
    const dm = useSelector(state => state.darkMode)

    useEffect(() => {
        // let query = new URLSearchParams(location.search);
        // // let collection_status = query.get("collection_status");
        // // let status = query.get("status");
      }, [location])

  return (
    <div>
        <NavBar />
        <div className={dm ? s.dmfeedbackPage : s.feedbackPage}>
            <p className={dm ? s.dmmessage : s.message}>Proceso Completado</p>
            {/* Cambiar Hero Image */}
            <div className={dm ? s.dmheroFeedback : s.heroFeedback}></div>
            <button className={dm ? s.dmmainButton : s.mainButton} onClick={handleClick}>Regresar al Home</button>
        </div>
        <Footer />
    </div>
  )
}

export default Feedback

// http://localhost:3000/feedback?collection_id=1311911267&collection_status=approved&payment_id=1311911267&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=7282314936&preference_id=240429259-0f60db29-dc99-4a5a-81fa-b3cf1f29a442&site_id=MLA&processing_mode=aggregator&merchant_account_id=null