import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
//import s from "./Verify.module.css";
import { statusRegister } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Verify() {
  const { token } = useParams();
  const [status, setStatus] = useState("");
  useEffect(() => {
    statusRegister(token);
  }, []);

  const history = useHistory();

  const statusRegister = async (token) => {
    try {
      let validate = await axios.put(`/verify/${token}`);
      console.log(validate.data);
      if (validate.data.status === "SUCCESS") {
        setStatus(validate.data.status);
      } else setStatus(validate.data.status);
    } catch (error) {
      alert(error);
    }
  };
  if (status !== "") {
    if (status === "SUCCESS") {
      setTimeout(function () {
        history.push("/login");
      }, 2000);
      return <div>"Validación éxitosa"</div>;
    } else {
      setTimeout(function () {
        history.push("/login");
      }, 2000);
      return <div>"Validación fallida"</div>;
    }
  }
}
export default Verify;
