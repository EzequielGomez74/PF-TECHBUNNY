import React from "react";
import imgEze from "../../Photos/eze.png";
import imgAli from "../../Photos/ali.png";
import imgAbi from "../../Photos/abi.png";
import imgBeto from "../../Photos/beto.png";
import imgSanti from "../../Photos/santi.png";
import imgEmi from "../../Photos/emi.png";
import imgMati from "../../Photos/mati.png";
import imgGer from "../../Photos/ger.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./About.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
//asd
function aboutUs() {
  return (
    <div>
      <NavBar />
      <div className="backgroundAboutUs">
        <div className="tituloEquipo">Nuestro Equipo</div>
        <div className="cardsContainer">
          <div className="card">
            <div className="divImg">
              <img className="img" src={imgEze} alt="img" />
            </div>
            <h3 className="apodo">EZE</h3>
            <h2 className="nombreCompleto">Ezequiel Gomez</h2>

            <a href="https://github.com/EzequielGomez74">
              {" "}
              <FontAwesomeIcon className="gitHub" icon={faGithub} />{" "}
            </a>

            <a href="https://www.linkedin.com/in/ezequiel-gomez-b9b563208/">
              {" "}
              <FontAwesomeIcon className="linkedin" icon={faLinkedin} />{" "}
            </a>
          </div>
          <div className="card">
            <div className="divImg">
              <img className="img" src={imgAli} alt="img" />
            </div>
            <h3 className="apodo">ALI</h3>
            <h2 className="nombreCompleto">Alissa Gamarra</h2>

            <a href="https://github.com/alissagaar">
              {" "}
              <FontAwesomeIcon className="gitHub" icon={faGithub} />{" "}
            </a>

            <a href="https://www.linkedin.com/in/alissa-gamarra/">
              <FontAwesomeIcon className="linkedin" icon={faLinkedin} />{" "}
            </a>
          </div>

          <div className="card">
            <div className="divImg">
              <img className="img" src={imgBeto} alt="img" />
            </div>
            <h3 className="apodo">BETO</h3>
            <h2 className="nombreCompleto">Alberto Martinez</h2>

            <a href="https://github.com/kubonka">
              {" "}
              <FontAwesomeIcon className="gitHub" icon={faGithub} />{" "}
            </a>

            <a href="https://www.linkedin.com/in/ezequiel-gomez-b9b563208/">
              <FontAwesomeIcon className="linkedin" icon={faLinkedin} />{" "}
            </a>
          </div>

          <div className="card">
            <div className="divImg">
              <img className="img" src={imgAbi} alt="img" />
            </div>
            <h3 className="apodo">ABI</h3>
            <h2 className="nombreCompleto">Abigail Breno</h2>
            <a href="https://github.com/abibreno">
              {" "}
              <FontAwesomeIcon className="gitHub" icon={faGithub} />{" "}
            </a>
            <a href="https://www.linkedin.com/in/abi-breno-a0140320b/">
              <FontAwesomeIcon className="linkedin" icon={faLinkedin} />{" "}
            </a>
          </div>
          <div className="card">
            <div className="divImg">
              <img className="img" src={imgSanti} alt="img" />
            </div>
            <h3 className="apodo">SANTI</h3>
            <h2 className="nombreCompleto">Santiago Larrique</h2>

            <a href="https://github.com/SantiagoL1804">
              {" "}
              <FontAwesomeIcon className="gitHub" icon={faGithub} />{" "}
            </a>

            <a href="https://www.linkedin.com/in/santiago-larrique-8bb549146/">
              <FontAwesomeIcon className="linkedin" icon={faLinkedin} />{" "}
            </a>
          </div>

          <div className="card">
            <div className="divImg">
              <img className="img" src={imgEmi} alt="img" />
            </div>
            <h3 className="apodo">EMI</h3>
            <h2 className="nombreCompleto">Emiliano Hernandez</h2>

            <a href="https://github.com/emijhernandez">
              {" "}
              <FontAwesomeIcon className="gitHub" icon={faGithub} />{" "}
            </a>

            <a href="https://www.linkedin.com/in/emiliano-hernandez-473a3a231/">
              <FontAwesomeIcon className="linkedin" icon={faLinkedin} />{" "}
            </a>
          </div>

          <div className="card">
            <div className="divImg">
              <img className="img" src={imgMati} alt="img" />
            </div>
            <h3 className="apodo">MATI</h3>
            <h2 className="nombreCompleto">Matias Gimenez</h2>
            <a href="https://github.com/Matyarg">
              {" "}
              <FontAwesomeIcon className="gitHub" icon={faGithub} />{" "}
            </a>
            <a href="https://www.linkedin.com/in/matiassgimenez/">
              <FontAwesomeIcon className="linkedin" icon={faLinkedin} />{" "}
            </a>
          </div>

          <div className="card">
            <div className="divImg">
              <img className="img" src={imgGer} alt="img" />
            </div>
            <h3 className="apodo">GER</h3>
            <h2 className="nombreCompleto">German Fernandez</h2>
            <a href="https://github.com/gerlini">
              {" "}
              <FontAwesomeIcon className="gitHub" icon={faGithub} />{" "}
            </a>
            <a href="https://www.linkedin.com/in/gerlini/">
              <FontAwesomeIcon className="linkedin" icon={faLinkedin} />{" "}
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default aboutUs;
