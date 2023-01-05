import React from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { useSelector } from "react-redux";
import CardV from "../Card V/CardV";
import { useState, useEffect, useRef } from "react";
import s from "../Category/Category.module.css";
import Pagination from "../Pagination/Pagination";

function Results() {
  const results = useSelector((state) => state.results2);
  const st = useSelector((state) => state.searchTerm);

  // const [results, setResults] = useState([]);
  // const initialLoad = useRef(true);

  // useEffect(() => {
  //   if (initialLoad.current) {
  //     setResults([...resultsGlobal]);
  //     if (results.length !== 0) {
  //       initialLoad.current = false;
  //     }
  //   }
  // }, [results, resultsGlobal]);

  let [currentPage, setCurrentPage] = useState(1);
  let [productsPerPage] = useState(12);
  let indexLastProduct = currentPage * productsPerPage;
  let indexFirstProduct = indexLastProduct - productsPerPage;
  let currentResults = results.slice(indexFirstProduct, indexLastProduct);

  let paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <NavBar />
      <section>
        <h4>
          {results.length} resultados para ''{st}''{" "}
        </h4>
        <div>
          {currentResults.length ? (
            currentResults.map((p) => (
              <CardV
                key={p.product_id}
                id={p.product_id}
                brand={p.brand}
                name={p.name}
                image={p.image}
                price={p.price}
                category={p.category}
                subcategory={p.subcategory}
              />
            ))
          ) : (
            <span> No hay resultados </span>
          )}
        </div>
        <div>
          <Pagination
            productsPerPage={productsPerPage}
            products={results.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Results;
