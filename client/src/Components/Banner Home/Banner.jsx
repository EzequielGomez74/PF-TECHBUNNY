import React from 'react'
import imgBanner from "../../Photos/imgBanner.png";
import s from "../Banner Home/Banner.module.css";


function BannerHome() {
  return (
    <div className={s.cointainerBanner}>
        <div className={s.containerElements}>
        <div className={s.bannerContainer}>
            <img className={s.imgBanner} src={imgBanner}  alt="not found" />
        </div>
        <div className={s.textBanner}>
            <h2>¡Todo lo que buscas, en un solo lugar!</h2>
            </div>
        </div>
            
    </div>
  )
}

export default BannerHome;