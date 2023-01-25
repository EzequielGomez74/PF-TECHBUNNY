import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import s from "./Feedback.module.css";
import img from "../../images/comprabunny.png";
import axios from "axios";
import { updateOrder, getOrderByPreferenceId } from "../../redux/actions";

function Feedback() {
  let location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const dm = useSelector((state) => state.darkMode);
  //const orders = useSelector((state) => state.orders);
  const handleClick = () => {
    history.push("/home");
  };
  let query = new URLSearchParams(location.search);
  let status = query.get("status");
  const initialLoad = useRef(true);
  useEffect(() => {
    console.log("1");
    if (initialLoad.current) {
      initialLoad.current = false;
      console.log("status ", status);
      dispatch(getOrderByPreferenceId(query.get("preference_id")));
      return;
    }
    console.log("2");
    if (status === "approved") {
      console.log("order_id -> ", orders[0].order_id);
      dispatch(updateOrder(orders[0].order_id, { status: "completed" }));
      console.log("pasa el dispatch");
    }
  }, [orders]); //location

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
