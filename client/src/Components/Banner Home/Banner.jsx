import React from 'react'
// import imgBanner from "../../Photos/imgBanner.png";
import s from "../Banner Home/Banner.module.css";
// import imgBannerOferta from "../../Photos/BANNEROFERTA.png";
import img from '../../Photos/loguito.png'
import img2 from '../../Photos/loguito.png'


function BannerHome() {
  return (
    <div className={s.cointainerBanner}>
        <div className={s.containerElements}>
        {/* <div className={s.ContainerOferta}>
        <img className={s.imgBannerOferta} src={imgBannerOferta} />
        </div> */}
        <div className={s.bannerContainer}>     
            <img className={s.imgBanner} src={img}  alt="not found" />
            <img className={s.imgBanner2} src={img2}  alt="not found" />
        </div>
        <div className={s.textBanner}>
            <h2>¡Todo lo que buscas, en un solo lugar!</h2>
            </div>
        </div>
        {/* <div className={s.ContainerOferta2}>
        <img className={s.imgBannerOferta2} src={imgBannerOferta} />
        </div> */}
    </div>
  )
}

export default BannerHome;