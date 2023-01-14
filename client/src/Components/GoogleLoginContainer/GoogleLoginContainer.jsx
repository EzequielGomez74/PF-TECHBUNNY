import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import loginUser from "../../scripts/loginUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";
import s from "./GoogleLoginContainer.module.css";

const GoogleLoginContainer = () => {
  const dm = useSelector((state) => state.darkMode);
  const clientId =
    "359312154823-68i39m2gfa3fur10gbvcoutohieia5p5.apps.googleusercontent.com"; //process.env.GOOGLE_LOGIN_CLIENT_ID;
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

  async function responseGoogle(response) {
    console.log(response);
    if (response?.tokenId) {
      loginUser({ tokenId: response.tokenId }, (status) => {
        if (status === "EMAIL ALREADY IN USE") alert("EMAIL ALREADY IN USE");
      });
    } else {
      throw new Error("Google login error");
    }
  }
  return (
    // <button className={dm ? s.dmb2 : s.b2}>
    //   <FontAwesomeIcon icon={faGoogle} />
    //   &nbsp;&nbsp;&nbsp;Iniciar Sesión con Google

    // </button>
    // <div className={s.googleLogin}>
    <GoogleLogin
      clientId={clientId}
      buttonText="login con google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      className={s.signInButton}
    />
    // </div>
  );
};

export default GoogleLoginContainer;