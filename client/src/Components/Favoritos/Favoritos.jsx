import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import CardH from '../Card H/CardH';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import s from './Favoritos.module.css'
import favorito from '../../Photos/favorito.png'
import * as actions from '../../redux/actions';
import { faV } from '@fortawesome/free-solid-svg-icons';


function Favoritos() {

    //dark mode
  const dm = useSelector(state => state.darkMode);
  const dispatch = useDispatch();

  let user = useSelector(state => state.loggedUser);
  let favoritos = useSelector(state => state.detail)
  
  const favs = useSelector(state => state.favorites);
    console.log(favs);

  useEffect(() => {
    if(user.user_id) 
    dispatch(actions.addFavorite(user.user_id));
  },[])

    return (
        <div>
            <NavBar />
            <section className={dm ? s.dmfavSection : s.favSection}>
            {favs.length ? favs.map(p => <CardH
            user_id={user.user_id}
                key={p.id} product_id={p.product_id}
                stock={p.stock} brand={p.brand}
                name={p.name} image={p.image} price={p.price}/>)
            : 
            <div>
               <img className={s.favorito} src={favorito} alt=""></img>
                <p className={dm ? s.dmmessage : s.message}>¡Todavía no has agregado productos favoritos!</p>
            </div>}
            
            </section>
            <Footer/>
        </div>
    )
}

export default Favoritos