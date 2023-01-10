import React from "react";
import "./Banner.css";
import imgBanner from "../../Photos/imgBanner.png";

function BannerHome() {
  return (
    <div className="cointainerBanner">
      <div className="containerElements">
        <div className="bannerContainer">
          <img className="imgBanner" src={imgBanner} alt="not found" />
        </div>
        <div className="textBanner">
          <h2>¡Todo lo que buscas, en un solo lugar!</h2>
        </div>
      </div>
    </div>
  );
}

export default BannerHome;
