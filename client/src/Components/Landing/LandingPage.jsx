import imgEze from "../../Photos/eze.png";
import imgAli from "../../Photos/ali.png";
import imgAbi from "../../Photos/abi.png";
import imgBeto from "../../Photos/beto.png";
import imgSanti from "../../Photos/santi.png";
import imgEmi from "../../Photos/emi.png";
import imgMati from "../../Photos/mati.png";
import imgGer from "../../Photos/ger.png";
import React from 'react';
import { Link } from "react-router-dom";
import "./LandingPage.scss";
import {FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faAngleDown , faAngleUp } from '@fortawesome/free-solid-svg-icons'
import {faGithub, faLinkedin  } from "@fortawesome/free-brands-svg-icons";

 

export default function LandingPage() {
 
  return (
<<<<<<< HEAD
    
    <div className="maincontainer">

      <section id="tolanding">
      <div className="Landing">
    <div className="topspace">
=======
    <div className="landing">
      <div className="divTitulo">
        <Link to="/home">
          <img src={img} className="banner" />
        </Link>
      </div>

      <p class="typing-animation">
        ¡Bienvenido a nuestro ecommerce de tecnología! <br />
        Somos una empresa líder en la venta de productos de alta calidad.
        <br />
        Nuestro objetivo es ofrecerte lo mejor de la tecnología al mejor precio{" "}
        <br />y con un servicio de atención al cliente excepcional.
        <br />
        Ingresa y mira nuestro catalogo de mas de 800 productos y <br />
        descubrir todo lo que tenemos para ofrecerte. ¡Que lo disfrutes!
      </p>

      <div>
        <img class="imgBanner" src={img1} />
        <img class="imgBanner" src={img2} />
        <img class="imgBanner" src={img3} />
      </div>
>>>>>>> b687dc0fca529212cc210a60788a56ca71e2c198
    </div>
    <div className="TextandButton">

      <div className="firsttext">
        <p className="Maintext">TECHBUNNY</p>
      </div>

      <div className="secondarytext">
        <p className="Secondtext" >Toda la tecnología en un solo lugar.</p>
      </div>

      <div className="btncointainer">
        <Link to="/home">
          <button className="joinbtn">Ingresar</button>
        </Link>
      </div>
        
    </div>
        <div  className="ourteam" >

            <a className="dropdown" href="#aboutid">
              <FontAwesomeIcon icon={faAngleDown} /></a>
        </div>
  </div>
      </section>
  
    <section id="aboutid" className="about" >
       {/* <div className="landingtituloEquipo">Nuestro Equipo</div> */}
        <div className="landingbackgroundAboutUs">
        <div  className="ourteam" >
          <a className="uptolanding" href="#tolanding"><FontAwesomeIcon icon={faAngleUp} /></a>
        </div>   
        
        <div className="landingcardsContainer">
            <div className="landingcard">
                <div className="landingdivImg">
                <img className="landingimg" src={imgEze} alt="img"/>
                </div>
                <h3 className="landingapodo">EZE</h3>
                <h2 className="landingnombreCompleto">Ezequiel Gomez</h2>

                <a href="https://github.com/EzequielGomez74"> <FontAwesomeIcon className="landinggitHub" icon={faGithub}/> </a> 

                <a href="https://www.linkedin.com/in/ezequiel-gomez-b9b563208/"> <FontAwesomeIcon className="landinglinkedin" icon={faLinkedin} /> </a> 
            </div>

            <div className="landingcard">
            <div className="landingdivImg">
                <img className="landingimg" src={imgAbi} alt="img"/>
                </div>
                <h3 className="landingapodo">ABI</h3>
                <h2 className="landingnombreCompleto">Abigail Breno</h2>
                <a href="https://github.com/abibreno"> <FontAwesomeIcon className="landinggitHub" icon={faGithub}/>  </a> 
                <a href="https://www.linkedin.com/in/abi-breno-a0140320b/"><FontAwesomeIcon className="landinglinkedin" icon={faLinkedin} /> </a>
         
            </div>
            
            <div className="landingcard">
            <div className="landingdivImg">
                <img className="landingimg" src={imgBeto}  alt="img"/>
                </div>
                <h3 className="landingapodo">BETO</h3>
                <h2 className="landingnombreCompleto">Alberto Martinez</h2>

                <a href="https://github.com/kubonka">  <FontAwesomeIcon className="landinggitHub" icon={faGithub}/> </a>

                <a href="https://www.linkedin.com/in/alberto-martinez-a0242b260/"><FontAwesomeIcon className="landinglinkedin"icon={faLinkedin} /> </a>
            </div>
           
            <div className="landingcard">
                <div className="landingdivImg">
                <img className="landingimg" src={imgAli} alt="img"/>
                </div>
                <h3 className="landingapodo">ALI</h3>
                <h2 className="landingnombreCompleto">Alissa Gamarra</h2>

                <a href="https://github.com/alissagaar"> <FontAwesomeIcon className="landinggitHub" icon={faGithub}/>  </a> 

                <a href="https://www.linkedin.com/in/alissa-gamarra/"><FontAwesomeIcon className="landinglinkedin" icon={faLinkedin} /> </a>
            </div>


                  <div className="landingcard">
                <div className="landingdivImg">
                <img className="landingimg" src={imgSanti} alt="img"/>
                </div>
                <h3 className="landingapodo">SANTI</h3>
                <h2 className="landingnombreCompleto">Santiago Larrique</h2>

                 <a href="https://github.com/SantiagoL1804"> <FontAwesomeIcon className="landinggitHub" icon={faGithub}/> </a>

                <a href="https://www.linkedin.com/in/santiago-larrique-8bb549146/"><FontAwesomeIcon className="landinglinkedin" icon={faLinkedin} /> </a>
            </div>
            

            <div className="landingcard">
            <div className="landingdivImg">
                <img className="landingimg" src={imgEmi} alt="img"/>
                </div>
                <h3 className="landingapodo">EMI</h3>
                <h2 className="landingnombreCompleto">Emiliano Hernandez</h2>

                <a href="https://github.com/emijhernandez"> <FontAwesomeIcon className="landinggitHub" icon={faGithub}/> </a>

                <a href="https://www.linkedin.com/in/emiliano-hernandez-473a3a231/"><FontAwesomeIcon className="landinglinkedin" icon={faLinkedin} /> </a>
            </div>

            <div className="landingcard">
            <div className="landingdivImg">
                <img className="landingimg" src={imgMati} alt="img"/>
                </div>
                <h3 className="landingapodo">MATI</h3>
                <h2 className="landingapodo">Matias Gimenez</h2>
                <a href="https://github.com/Matyarg"> <FontAwesomeIcon className="landinggitHub" icon={faGithub}/> </a> 
                <a href="https://www.linkedin.com/in/matiassgimenez/"><FontAwesomeIcon className="landinglinkedin" icon={faLinkedin} /> </a>
            </div>
            
            <div className="landingcard">
            <div className="landingdivImg">
                <img className="landingimg" src={imgGer} alt="img"/>
                </div>
                <h3 className="landingapodo">GER</h3>
                <h2 className="landingnombreCompleto">German Fernandez</h2>
                <a href="https://github.com/gerlini"> <FontAwesomeIcon className="landinggitHub" icon={faGithub}/> </a> 
                <a href="https://www.linkedin.com/in/gerlini/"><FontAwesomeIcon className="landinglinkedin" icon={faLinkedin} /> </a>

            </div>
            
        </div>
        <div className="landingtituloEquipo"><h3 className="landingtituloEquipo">Nuestro Equipo</h3></div>
        </div>
        
        </section>

  

  </div>
  );
}
