// import React, { useEffect, useState, useRef } from "react";
// import s from "./SearchBar.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { getProducts, getSearchResults } from "../../redux/actions";
// import { useDispatch, useSelector } from "react-redux";

// function SearchBar() {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products);
//   const initialLoad = useRef(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   console.log(searchTerm);

//   useEffect(() => {
//     if (initialLoad.current) {
//       dispatch(getProducts());
//       initialLoad.current = false;
//     }
//     if (searchTerm !== "") dispatch(getSearchResults(searchTerm));
//   }, [dispatch, searchTerm]);

//   const handleChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <div className="search2">
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleChange}
//         className={s.input}
//         placeholder={`Buscar productos`}
//       />
//       <button className={s.inputIcon}>
//         <FontAwesomeIcon icon={faMagnifyingGlass} />
//       </button>
//     </div>
//   );
// }

// export default SearchBar;

import React, { useEffect, useState, useRef } from "react";
import s from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  getProducts,
  getSearchResults,
  getSearchTerm,
  getResultsComponent,
  getResults,
  cleanSearchResults,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

function SearchBar() {
  const results = useSelector((state) => state.results);
  const dispatch = useDispatch();
  const history = useHistory();
  const initialLoad = useRef(true);
  const notFound = useRef(false);
  const noTerm = useRef(true);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (noTerm.current && searchTerm.length) {
      console.log("1 search");
      console.log(searchTerm);
      noTerm.current = false;
    } else if (!noTerm.current && !searchTerm.length) {
      noTerm.current = true;
    }
    if (!notFound.current && searchTerm.length) {
      notFound.current = true;
    }
    console.log("2 search");
    if (initialLoad.current) {
      dispatch(getProducts());
      initialLoad.current = false;
    }

    console.log(searchTerm);
    if (searchTerm === "") dispatch(cleanSearchResults());
    if (searchTerm !== "") dispatch(getSearchResults(searchTerm));
  }, [dispatch, searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // const handleClick = (e) => {
  //   // setSearchTerm(e.target.value);
  //   // dispatch(getSearchTerm(searchTerm));
  //   // dispatch(getResults(products, searchTerm));
  //   history.push(`/results/${searchTerm}`);
  //   setSearchTerm("");
  // };

  return (
    <div className="search2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className={s.input}
        placeholder={`Buscar productos`}
      />
      {/* <button className={s.inputIcon}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button> */}

      {notFound === true && results.length === 0 && (
        <ul className={s.notFound}>
          <li>No se encontraron resultados</li>
        </ul>
      )}

      {noTerm && !results.length && (
        <ul className={s.hiden}>
          <li> </li>
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
