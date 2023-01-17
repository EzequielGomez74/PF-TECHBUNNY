import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useHistory } from "react-router-dom";
import exitosa from '../../Photos/conejofeliz.png'
import fallida from '../../Photos/conejotriste.png'
import './Verify.scss'
import Swal from "sweetalert2";


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
      Swal.fire({
        title: "¡Alerta!",
        text: "Validación fallida",
        icon: "error",
      });
    }
  };
  if (status !== "") {
    if (status === "SUCCESS") {
      setTimeout(function () {
        history.push("/login");
      }, 6000);
      return <div>
        <img className="imgExitosa" src={exitosa} alt="" />
        <h1 className="ValidExitosa">Validación éxitosa</h1>

      </div>;
    } else {
      setTimeout(function () {
        history.push("/login");
      }, 6000);
      return <div>
        <img className="imgFallida" src={fallida} alt="" />
        <h1 className="ValidFallida">Validación fallida</h1>
        
        </div>;
    }
  }
  <Footer />
}
export default Verify;
