import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardH from "../Card H/CardH";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import s from "./Favoritos.module.css";
import favorito from "../../Photos/favorito.png";
import * as actions from "../../redux/actions";
import { faV } from "@fortawesome/free-solid-svg-icons";

function Favoritos() {
  //dark mode
  const dm = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  let loggedUser = useSelector((state) => state.loggedUser);

  const favs = useSelector((state) => state.favorites);

  //Para que al recargar la pagina no se borre la cantidad de favoritos.
  useEffect(() => {
    if (loggedUser.user_id) {
      dispatch(actions.allFavoritesByUser(loggedUser.user_id));
    }
  }, [loggedUser]);

  return (
    <div>
      <NavBar />
      <section className={dm ? s.dmfavSection : s.favSection}>
        {favs.length ? (
          favs.map((p) => (
            <CardH
              user_id={loggedUser.user_id}
              key={p.id}
              product_id={p.product_id}
              stock={p.stock}
              brand={p.brand}
              name={p.name}
              image={p.image}
              price={p.price}
            />
          ))
        ) : (
          <div>
            <img className={s.favorito} src={favorito} alt=""></img>
            <p className={dm ? s.dmmessage : s.message}>
              ¡Todavía no has agregado productos favoritos!
            </p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default Favoritos;
