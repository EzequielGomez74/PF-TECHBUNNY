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
  const history = useHistory();
  const ininitialLoad = useRef(true);
  const notFound = useRef(false);
  const noTerm = useRef(true);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (ininitialLoad.current) {
      dispatch(getProducts());
      ininitialLoad.current = false;
    }
    console.log(searchTerm);
    if (searchTerm !== "") dispatch(getSearchResults(searchTerm));

    if (!notFound.current && searchTerm.length) {
      notFound.current = true;
    }

    if (noTerm.current && searchTerm.length) {
      noTerm.current = false;
    } else if (!noTerm.current && !searchTerm.length) {
      noTerm.current = true;
    }
  }, [dispatch, searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (!notFound.current && searchTerm.length) {
      notFound.current = true;
    }
  };

  const handleClick = (e) => {
    // setSearchTerm(e.target.value);
    // dispatch(getSearchTerm(searchTerm));
    // dispatch(getResults(products, searchTerm));
    history.push(`/results/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <form className={s.searchContainer}>
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
      <div className={s.searchScroll}>
        <ul className={s.searchElement}>
          {searchTerm &&
            results.length &&
            results.map((p, i) => {
              if (i < 15)
                return (
                  <li>
                    <Link to={`/detail/${p.product_id}`}>
                      {" "}
                      <img className={s.imgsearch} src={p.image} alt={p.name} />
                    </Link>
                    <Link to={`/detail/${p.product_id}`}>
                      {" "}
                      <span className={s.NameSearch}> {p.name} </span>{" "}
                    </Link>
                  </li>
                );
            })}
        </ul>

        {notFound && "" === 0 && results.length && (
          <ul className={s.notFound}>
            <li>No se encontraron resultados</li>
          </ul>
        )}

        {noTerm && !results.length && <div className={s.hiden}></div>}
      </div>
    </form>
  );
}

export default SearchBar;
