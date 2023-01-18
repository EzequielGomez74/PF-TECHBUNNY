import React, { useEffect, useState, useRef } from "react";
import s from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  getProducts,
  getSearchResults,
  cleanSearchResults,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link, NavLink } from "react-router-dom";

function SearchBar() {
  const results = useSelector((state) => state.results);
  const dispatch = useDispatch();
  const history = useHistory();
  const initialLoad = useRef(true);
  const notFound = useRef(false);
  const noTerm = useRef(true);
  const initialSearch = useRef(true);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.length <= 2 && !initialSearch.current) {
      dispatch(cleanSearchResults());
    }
    // if (noTerm.current && searchTerm.length) {
    //   console.log("1 search");
    //   console.log(searchTerm);
    //   noTerm.current = false;
    // } else if (!noTerm.current && !searchTerm.length) {
    //   noTerm.current = true;
    // }
    // if (!notFound.current && searchTerm.length) {
    //   notFound.current = true;
    // }
    console.log("2 search");
    if (initialLoad.current) {
      dispatch(getProducts());
      initialLoad.current = false;
      initialSearch.current = false;
    }

    console.log(searchTerm);

    if (searchTerm.length > 2) dispatch(getSearchResults(searchTerm));
  }, [dispatch, searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    // setSearchTerm(e.target.value);
    // dispatch(getSearchTerm(searchTerm));
    // dispatch(getResults(products, searchTerm));
    // history.push(`/results/${searchTerm}`);
    history.push({
      pathname: `/results/${searchTerm}`,
      state: { resultado: [...results] },
    });
    setSearchTerm("");
  };

  const handleDeleteSearchTerm = () => {
    setSearchTerm("");
  };

  return (
    <form className={s.searchContainer}>
      <span className={s.inputContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          className={s.input}
          placeholder={`Buscar productos`}
        />
        {searchTerm.length > 0 && (
          <button
            onClick={handleDeleteSearchTerm}
            class={s.inputCloseButton}
            onclick="clearInput()"
          >
            X
          </button>
        )}
      </span>
      <button className={s.inputIcon} onClick={handleClick}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <span className={s.searchScroll}>
        <ul className={s.searchElement}>
          {searchTerm.length > 0 &&
            results.length > 0 &&
            results.map((p, i) => {
              if (i < 15)
                return (
                  <span className={s.searchChildContainer}>
                    <NavLink to={`/detail/${p.product_id}`}>
                      <li>
                        {/* <Link to={`/detail/${p.product_id}`}> */}{" "}
                        <img
                          className={s.imgsearch}
                          src={p.image}
                          alt={p.name}
                        />
                        {/* </Link>
                    <Link to={`/detail/${p.product_id}`}> */}{" "}
                        <span className={s.nameAndPrice}>
                          <p className={s.NameSearch}> {p.name} </p>{" "}
                          <p className={s.priceSearch}> US$ {p.price} </p>{" "}
                        </span>
                        {/* </Link> */}
                      </li>
                    </NavLink>
                  </span>
                );
            })}
          {results.length >= 15 && searchTerm.length > 0 && (
            <span>
              {" "}
              <Link to={`/results/${searchTerm}`}>
                <li className={s.allResults}>
                  Ver todos los resultados de busqueda
                </li>
              </Link>
            </span>
          )}
        </ul>

        {notFound === true && results.length === 0 && (
          <ul className={s.notFound}>
            <li>No se encontraron resultados</li>
          </ul>
        )}

        {noTerm && results?.length === 0 && (
          <ul className={s.hiden}>
            <li> </li>
          </ul>
        )}
      </span>
    </form>
  );
}

export default SearchBar;
