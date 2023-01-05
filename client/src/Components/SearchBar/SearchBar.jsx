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
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

function SearchBar() {
  const results = useSelector((state) => state.results);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const ininitialLoad = useRef(true);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (ininitialLoad.current) {
      dispatch(getProducts());
      ininitialLoad.current = false;
    }
    if (searchTerm !== "") dispatch(getSearchResults(products, searchTerm));
  }, [dispatch, searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const history = useHistory();

  const handleClick = (e) => {
    setSearchTerm(e.target.value);
    dispatch(getSearchTerm(searchTerm));
    dispatch(getResults(products, searchTerm));
    history.push("/results");
  };

  return (
    <div className="search2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className={s.input}
        placeholder={`Buscar productos`}
      />
      <button className={s.inputIcon} onClick={handleClick}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      {searchTerm && results
        ? results.map((p, i) => {
            if (i < 15)
              return (
                <div className="hola123">
                  <Link to={`/detail/${p.product_id}`}>
                    {" "}
                    <img className="imgsearch" src={p.image} alt={p.name} />
                  </Link>
                  <Link to={`/detail/${p.product_id}`}>
                    {" "}
                    <span className="NameSearch"> {p.name} </span>{" "}
                  </Link>
                </div>
              );
          })
        : null}
    </div>
  );
}

export default SearchBar;
