import React from "react";
import imgBetoWhite from "../../Photos/betoWhite.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import "./index.css";


function aboutUs() {
    return (
        <div className="backgroundAboutUs">
        <div className="tituloEquipo">Nuestro Equipo</div>
        <div className="cardsContainer">
            <div className="card">
                <div className="divImg">
                <img className="img" src={imgBetoWhite} alt="img"/>
                </div>
                <h3 className="apodo">EZE</h3>
                <h2 className="nombreCompleto">Ezequiel Gomez</h2>
                <FontAwesomeIcon className="gitHub" icon={faGithub}/>
            </div>
            <div className="card">
                <div className="divImg">
                <img className="img" src={imgBetoWhite} alt="img"/>
                </div>
                <h3 className="apodo">ALI</h3>
                <h2 className="nombreCompleto">Alissa Gamarra</h2>
                <FontAwesomeIcon className="gitHub" icon={faGithub}/>
            </div>
            <div className="card">
            <div className="divImg">
                <img className="img" src={imgBetoWhite} alt="img"/>
                </div>
                <h3 className="apodo">SANTI</h3>
                <h2 className="nombreCompleto">Santiago Larrique</h2>
                <FontAwesomeIcon className="gitHub" icon={faGithub}/>
            </div>
            <div className="card">
            <div className="divImg">
                <img className="img" src={imgBetoWhite} alt="img"/>
                </div>
                <h3 className="apodo">EMI</h3>
                <h2 className="nombreCompleto">Emiliano Hernandez</h2>
                <FontAwesomeIcon className="gitHub" icon={faGithub}/>
            </div>
            <div className="card">
            <div className="divImg">
                <img className="img" src={imgBetoWhite} alt="img"/>
                </div>
                <h3 className="apodo">BETO</h3>
                <h2 className="nombreCompleto">Alberto Martinez</h2>
                <FontAwesomeIcon className="gitHub" icon={faGithub}/>
            </div>
            <div className="card">
            <div className="divImg">
                <img className="img" src={imgBetoWhite} alt="img"/>
                </div>
                <h3 className="apodo">MATI</h3>
                <h2 className="nombreCompleto">Matias Gimenez</h2>
                <FontAwesomeIcon className="gitHub" icon={faGithub}/>
            </div>
            <div className="card">
            <div className="divImg">
                <img className="img" src={imgBetoWhite} alt="img"/>
                </div>
                <h3 className="apodo">ABI</h3>
                <h2 className="nombreCompleto">Abigail Breno</h2>
                <FontAwesomeIcon className="gitHub" icon={faGithub}/>
            </div>
            <div className="card">
            <div className="divImg">
                <img className="img" src={imgBetoWhite} alt="img"/>
                </div>
                <h3 className="apodo">GER</h3>
                <h2 className="nombreCompleto">German Fernandez</h2>
                <FontAwesomeIcon className="gitHub" icon={faGithub}/>
            </div>
        </div>
        </div>



    )
}

export default aboutUs;