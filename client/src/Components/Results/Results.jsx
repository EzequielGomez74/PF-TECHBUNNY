import React from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import CardV from "../Card V/CardV";
import { useState, useEffect, useRef } from "react";
import s from "../Category/Category.module.css";
import Pagination from "../Pagination/Pagination";
import { getResults, getSearchResults } from "../../redux/actions";
import { useParams } from "react-router-dom";

function Results() {
  const results = useSelector((state) => state.results);
  // const st = useSelector((state) => state.searchTerm);
  let { searchTerm } = useParams();
  const dispatch = useDispatch();

  const [resultsLocal, setResultsLocal] = useState([]);
  const initialLoad = useRef(true);
  let searchTermChange = useRef(searchTerm);


  useEffect(() => {
    if (searchTermChange.current !== searchTerm) {
      console.log("1");
      initialLoad.current = true;
      searchTermChange.current = searchTerm;
    }
    if (initialLoad.current) {
      console.log("2");
      setResultsLocal([...results]);
      dispatch(getSearchResults(searchTerm));
      initialLoad.current = false;
    }
  }, [results, searchTerm]);

  let [currentPage, setCurrentPage] = useState(1);
  let [productsPerPage] = useState(12);
  let indexLastProduct = currentPage * productsPerPage;
  let indexFirstProduct = indexLastProduct - productsPerPage;
  let currentResults = resultsLocal.slice(indexFirstProduct, indexLastProduct);

  let paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <NavBar />
      <section>
        <h4>
          {resultsLocal.length} resultados para ''{searchTerm}''{" "}
        </h4>
        <div className={s.results}>
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
            <img
              src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
              alt=""
            />
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
