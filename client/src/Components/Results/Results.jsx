import React from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { useSelector } from "react-redux";
import CardV from "../Card V/CardV";
import { useState, useEffect } from "react";
import s from "../Results/Results.module.css";
import Pagination from "../Pagination/Pagination";
import { useParams, useLocation } from "react-router-dom";
import loading from "../../images/loadingg.gif";

function Results() {
  const results = useSelector((state) => state.results);
  const loggedUser = useSelector((state) => state.loggedUser);
  // const st = useSelector((state) => state.searchTerm);
  let { searchTerm } = useParams();
  //DARK MODE
  const dm = useSelector((state) => state.darkMode);

  const [resultsLocal, setResultsLocal] = useState([]);

  const {
    state: { resultado },
  } = useLocation();
  useEffect(() => {
    setResultsLocal(resultado);
  }, [resultado]); //results, searchTerm]);

  let [currentPage, setCurrentPage] = useState(1);
  let [productsPerPage] = useState(12);
  let indexLastProduct = currentPage * productsPerPage;
  let indexFirstProduct = indexLastProduct - productsPerPage;
  let currentResults = resultsLocal.slice(indexFirstProduct, indexLastProduct);

  let paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={dm ? s.dmresultsContainer : s.resultsContainer}>
      <NavBar />
      <div>
        <section>
          <h4>
            {resultsLocal.length} resultados para ''{searchTerm}''{" "}
          </h4>
          <div className={dm ? s.dmresults : s.results}>
            {currentResults.length ? (
              currentResults.map((p) => (
                <CardV
                  key={p.product_id}
                  product_id={p.product_id}
                  brand={p.brand}
                  name={p.name}
                  image={p.image}
                  price={p.price}
                  category={p.category}
                  subcategory={p.subcategory}
                  user_id={loggedUser.user_id}
                  favorite={p.favorite}
                />
              ))
            ) : (
              <div className={s.loading}>
                <img src={loading} alt="" />
              </div>
            )}
          </div>

          <div>
            <Pagination
              productsPerPage={productsPerPage}
              products={resultsLocal.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Results;
