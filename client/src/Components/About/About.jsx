import React from "react";
import imgEze from "../../Photos/eze.png";
import imgAli from "../../Photos/ali.png";
import imgAbi from "../../Photos/abi.png";
import imgBeto from "../../Photos/beto.png";
import imgSanti from "../../Photos/santi.png";
import imgEmi from "../../Photos/emi.png";
import imgMati from "../../Photos/mati.png";
import imgGer from "../../Photos/ger.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import s from './About.module.css';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useSelector } from 'react-redux';


function AboutUs() {

    const dm = useSelector(state => state.darkMode);

    return (
        <div>
        <NavBar />
        <div className={dm ? s.dmbackgroundAboutUs : s.backgroundAboutUs}>
            
        <div className={dm ? s.dmtituloEquipo : s.tituloEquipo}>Nuestro Equipo</div>
        <div className={dm ? s.dmcardsContainer : s.cardsContainer}>
            <div className={dm ? s.dmcard : s.card}>
                <div className={dm ? s.dmdivImg : s.divImg}>
                <img className={dm ? s.dmimg : s.img} src={imgEze} alt="img"/>
                </div>
                <h3 className={dm ? s.dmapodo : s.apodo}>EZE</h3>
                <h2 className={dm ? s.dmnombreCompleto : s.nombreCompleto}>Ezequiel Gomez</h2>

                <a href="https://github.com/EzequielGomez74"> <FontAwesomeIcon className={dm ? s.dmgitHub : s.gitHub} icon={faGithub}/> </a> 

                <a href="https://www.linkedin.com/in/ezequiel-gomez-b9b563208/"> <FontAwesomeIcon className={dm ? s.dmlinkedin : s.linkedin} icon={faLinkedin} /> </a> 
            </div>

            <div className={dm ? s.dmcard : s.card}>
            <div className={dm ? s.dmdivImg : s.divImg}>
                <img className={dm ? s.dmimg : s.img} src={imgAbi} alt="img"/>
                </div>
                <h3 className={dm ? s.dmapodo : s.apodo}>ABI</h3>
                <h2 className={dm ? s.dmnombreCompleto : s.nombreCompleto}>Abigail Breno</h2>
                <a href="https://github.com/abibreno"> <FontAwesomeIcon className={dm ? s.dmgitHub : s.gitHub} icon={faGithub}/>  </a> 
                <a href="https://www.linkedin.com/in/abi-breno-a0140320b/"><FontAwesomeIcon className={dm ? s.dmlinkedin : s.linkedin} icon={faLinkedin} /> </a>
         
            </div>
            
            <div className={dm ? s.dmcard : s.card}>
            <div className={dm ? s.dmdivImg : s.divImg}>
                <img className={dm ? s.dmimg : s.img} src={imgBeto} alt="img"/>
                </div>
                <h3 className={dm ? s.dmapodo : s.apodo}>BETO</h3>
                <h2 className={dm ? s.dmnombreCompleto : s.nombreCompleto}>Alberto Martinez</h2>

                <a href="https://github.com/kubonka">  <FontAwesomeIcon className={dm ? s.dmgitHub : s.gitHub} icon={faGithub}/> </a>

                <a href="https://www.linkedin.com/in/alberto-martinez-a0242b260/"><FontAwesomeIcon className={dm ? s.dmlinkedin : s.linkedin} icon={faLinkedin} /> </a>
            </div>
           
            <div className={dm ? s.dmcard : s.card}>
                <div className={dm ? s.dmdivImg : s.divImg}>
                <img className={dm ? s.dmimg : s.img} src={imgAli} alt="img"/>
                </div>
                <h3 className={dm ? s.dmapodo : s.apodo}>ALI</h3>
                <h2 className={dm ? s.dmnombreCompleto : s.nombreCompleto}>Alissa Gamarra</h2>

                <a href="https://github.com/alissagaar"> <FontAwesomeIcon className={dm ? s.dmgitHub : s.gitHub} icon={faGithub}/>  </a> 

                <a href="https://www.linkedin.com/in/alissa-gamarra/"><FontAwesomeIcon className={dm ? s.dmlinkedin : s.linkedin} icon={faLinkedin} /> </a>
            </div>


                  <div className={dm ? s.dmcard : s.card}>
                <div className={dm ? s.dmdivImg : s.divImg}>
                <img className={dm ? s.dmimg : s.img} src={imgSanti} alt="img"/>
                </div>
                <h3 className={dm ? s.dmapodo : s.apodo}>SANTI</h3>
                <h2 className={dm ? s.dmnombreCompleto : s.nombreCompleto}>Santiago Larrique</h2>

                 <a href="https://github.com/SantiagoL1804"> <FontAwesomeIcon className={dm ? s.dmgitHub : s.gitHub} icon={faGithub}/> </a>

                <a href="https://www.linkedin.com/in/santiago-larrique-8bb549146/"><FontAwesomeIcon className={dm ? s.dmlinkedin : s.linkedin} icon={faLinkedin} /> </a>
            </div>
            

            <div className={dm ? s.dmcard : s.card}>
            <div className={dm ? s.dmdivImg : s.divImg}>
                <img className={dm ? s.dmimg : s.img} src={imgEmi} alt="img"/>
                </div>
                <h3 className={dm ? s.dmapodo : s.apodo}>EMI</h3>
                <h2 className={dm ? s.dmnombreCompleto : s.nombreCompleto}>Emiliano Hernandez</h2>

                <a href="https://github.com/emijhernandez"> <FontAwesomeIcon className={dm ? s.dmgitHub : s.gitHub} icon={faGithub}/> </a>

                <a href="https://www.linkedin.com/in/emiliano-hernandez-473a3a231/"><FontAwesomeIcon className={dm ? s.dmlinkedin : s.linkedin} icon={faLinkedin} /> </a>
            </div>

            <div className={dm ? s.dmcard : s.card}>
            <div className={dm ? s.dmdivImg : s.divImg}>
                <img className={dm ? s.dmimg : s.img} src={imgMati} alt="img"/>
                </div>
                <h3 className={dm ? s.dmapodo : s.apodo}>MATI</h3>
                <h2 className={dm ? s.dmnombreCompleto : s.nombreCompleto}>Matias Gimenez</h2>
                <a href="https://github.com/Matyarg"> <FontAwesomeIcon className={dm ? s.dmgitHub : s.gitHub} icon={faGithub}/> </a> 
                <a href="https://www.linkedin.com/in/matiassgimenez/"><FontAwesomeIcon className={dm ? s.dmlinkedin : s.linkedin} icon={faLinkedin} /> </a>
            </div>
            
            <div className={dm ? s.dmcard : s.card}>
            <div className={dm ? s.dmdivImg : s.divImg}>
                <img className={dm ? s.dmimg : s.img} src={imgGer} alt="img"/>
                </div>
                <h3 className={dm ? s.dmapodo : s.apodo}>GER</h3>
                <h2 className={dm ? s.dmnombreCompleto : s.nombreCompleto}>German Fernandez</h2>
                <a href="https://github.com/gerlini"> <FontAwesomeIcon className={dm ? s.dmgitHub : s.gitHub} icon={faGithub}/> </a> 
                <a href="https://www.linkedin.com/in/gerlini/"><FontAwesomeIcon className={dm ? s.dmlinkedin : s.linkedin} icon={faLinkedin} /> </a>
            </div>
        </div>
        
        </div>
        <Footer />
        </div>



    )
}

export default AboutUs;