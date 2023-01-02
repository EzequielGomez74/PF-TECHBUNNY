import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import s from "./Details.module.css";

function DisplayReview({ reviews, product_id, handlePost }) {
  const dispatch = useDispatch();
  const initialLoad = useRef(true);
  const [totalReviews, setTotalReviews] = useState([]);
  const [localReviews, setLocalReviews] = useState({
    rating: "",
    description: "",
    product_id,
    //user hardcodeado
    user_id: 1,
    username: "Betolocura",
  });

  //END OF VARIABLES

  const handleChange = (e) => {
    setLocalReviews({
      ...localReviews,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePost({
      product_id: localReviews.product_id,
      description: localReviews.description,
      user_id: localReviews.user_id,
      rating: ratingToNumber(localReviews.rating),
    });
    setLocalReviews({
      ...localReviews,
      rating: "",
      description: "",
    });
  };

  const ratingToString = (rating) => {
    switch (rating) {
      case 1:
        return "★☆☆☆☆";
      case 2:
        return "★★☆☆☆";
      case 3:
        return "★★★☆☆";
      case 4:
        return "★★★★☆";
      case 5:
        return "★★★★★";
      default:
        return undefined;
    }
  };

  const ratingToNumber = (rating) => {
    switch (rating) {
      case "★☆☆☆☆":
        return 1;
      case "★★☆☆☆":
        return 2;
      case "★★★☆☆":
        return 3;
      case "★★★★☆":
        return 4;
      case "★★★★★":
        return 5;
      default:
        return undefined;
    }
  };
  // HTML
  return (
    <div>
      <section className={s.commentSection}>
        <div className={s.allComments}>
          <h5>
            <strong>Cantidad de comentarios:</strong> &nbsp;&nbsp;{" "}
            {reviews.length}
          </h5>
          <hr />
          <div>
            {reviews.length ? (
              reviews?.map((r) => (
                <div className={s.newComment}>
                  <span className={s.userId}>
                    <strong>Por {r.username}:</strong>
                  </span>
                  <span className={s.rating}>{ratingToString(r.rating)} </span>
                  <p className={s.review}>"{r.description}"</p>
                  <hr />
                </div>
              ))
            ) : (
              <p className={s.noReview}>
                Este producto aún no tiene reseñas. ¡Sé el primero en
                compartirnos tu opinión!
              </p>
            )}
            <form className={s.cForm} onSubmit={handleSubmit}>
              <div>
                <label className={s.label}>
                  Valoración de tu compra&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <select
                  name="rating"
                  value={localReviews.rating}
                  onChange={handleChange}
                >
                  <option>seleccionar</option>
                  <option value="★☆☆☆☆">★☆☆☆☆</option>
                  <option value="★★☆☆☆">★★☆☆☆</option>
                  <option value="★★★☆☆">★★★☆☆</option>
                  <option value="★★★★☆">★★★★☆</option>
                  <option value="★★★★★">★★★★★</option>
                </select>
              </div>
              <textarea
                rows="5"
                name="description"
                value={localReviews.description}
                placeholder="Escribe un comentario sobre tu compra"
                onChange={handleChange}
              />
              <br />
              <input
                className={s.mainButton}
                type="submit"
                value="Agregar Comentario"
              />
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DisplayReview;