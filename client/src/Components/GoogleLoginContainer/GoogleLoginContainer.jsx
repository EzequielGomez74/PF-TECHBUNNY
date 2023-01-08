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
  const clientId = process.env.GOOGLE_LOGIN_CLIENT_ID;
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

  async function responseGoogle(response) {
    console.log(response);
    if (response?.tokenId) {
      loginUser({ tokenId: response.tokenId });
    } else {
      throw new Error("Google login error");
    }
  }
  return (
    <button className={dm ? s.dmb2 : s.b2}>
      <FontAwesomeIcon icon={faGoogle} />
      &nbsp;&nbsp;&nbsp;Iniciar Sesión con Google
      <GoogleLogin
        clientId={clientId}
        buttonText="login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </button>
  );
};

export default GoogleLoginContainer;
