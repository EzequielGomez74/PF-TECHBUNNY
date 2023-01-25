import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import s from "./Feedback.module.css";
import img from "../../images/comprabunny.png";
import axios from "axios";
import { updateOrder } from "../../redux/actions";

function Feedback() {
  let location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const dm = useSelector((state) => state.darkMode);
  const orders = useSelector((state) => state.orders);
  const handleClick = () => {
    history.push("/home");
  };

  useEffect(() => {
    let query = new URLSearchParams(location.search);
    console.log(query);
    //let collection_status = query.get("collection_status");
    let status = query.get("status");
    console.log("status ", status);
    if (status === "approved") {
      console.log("orders[0] ", orders[0]);
      dispatch(updateOrder(orders[0].order_id, "completed"));
    }
  }, [location]);

  return (
    <div>
      <NavBar />
      <div className={dm ? s.dmfeedbackPage : s.feedbackPage}>
        <p className={dm ? s.dmmessage : s.message}>Proceso Completado</p>
        {/* Cambiar Hero Image */}
        <div className={dm ? s.dmheroFeedback : s.heroFeedback}>
          <img src={img} alt="bunny feedback" />
        </div>
        <button
          className={dm ? s.dmmainButton : s.mainButton}
          onClick={handleClick}
        >
          Regresar al Home
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Feedback;
