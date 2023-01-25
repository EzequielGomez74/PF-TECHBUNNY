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

  let menuRef = useRef(null);
  const [open, setOpen] = useState(false)

  const dm = useSelector((state) => state.darkMode);

  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [menuRef]);

  useEffect(() => {
    if (searchTerm.length <= 2 && !initialSearch.current) {
      dispatch(cleanSearchResults());
    }
    // if (noTerm.current && searchTerm.length) {
    //   noTerm.current = false;
    // } else if (!noTerm.current && !searchTerm.length) {
    //   noTerm.current = true;
    // }
    // if (!notFound.current && searchTerm.length) {
    //   notFound.current = true;
    // }
    if (initialLoad.current) {
      dispatch(getProducts());
      initialLoad.current = false;
      initialSearch.current = false;
    }

    if (searchTerm.length > 2) dispatch(getSearchResults(searchTerm));
  }, [dispatch, searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setOpen(true)
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
    <form className={dm ? s.dmsearchContainer : s.searchContainer}>
      <span className={dm ? s.dminputContainer : s.inputContainer}>
        <input
          className={dm ? s.dminput : s.input}
          ref={menuRef}
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={`Buscar productos`}
        />
        {searchTerm.length > 0 && (
          <button
            onClick={handleDeleteSearchTerm}
            class={dm ? s.dminputCloseButton : s.inputCloseButton}
            onclick="clearInput()"
          >
            X
          </button>
        )}
      </span>
      <button
        className={dm ? s.dminputIcon : s.inputIcon}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <span className={dm ? s.dmsearchScroll : s.searchScroll}>
        <ul ref={menuRef} className={dm ? s.dmsearchElement : s.searchElement}>
          {open && searchTerm.length > 0 &&
            results.length > 0 &&
            results.map((p, i) => {
              if (i < 15)
                return (
                  <span
                    className={
                      dm ? s.dmsearchChildContainer : s.searchChildContainer
                    }
                  >
                    <NavLink to={`/detail/${p.product_id}`}>
                      <li className={s.liSearchBar}>
                        {/* <Link to={`/detail/${p.product_id}`}> */}{" "}
                        <img
                          className={dm ? s.dmimgsearch : s.imgsearch}
                          src={p.image}
                          alt={p.name}
                        />
                        {/* </Link>
                    <Link to={`/detail/${p.product_id}`}> */}{" "}
                        <span
                          className={dm ? s.dmnameAndPrince : s.nameAndPrice}
                        >
                          <p className={dm ? s.dmNameSearch : s.NameSearch}>
                            {" "}
                            {p.name}{" "}
                          </p>{" "}
                          <p className={dm ? s.dmpriceSearch : s.priceSearch}>
                            {" "}
                            US$ {p.price}{" "}
                          </p>{" "}
                        </span>
                        {/* </Link> */}
                      </li>
                    </NavLink>
                  </span>
                );
            })}
          {open && results.length >= 15 && searchTerm.length > 0 && (
            <span>
              {" "}
              <Link to={`/results/${searchTerm}`}>
                <li className={dm ? s.dmallResults : s.allResults}>
                  Ver todos los resultados de busqueda
                </li>
              </Link>
            </span>
          )}
        </ul>

        {notFound === true && results.length === 0 && (
          <ul className={dm ? s.dmnotFound : s.notFound}>
            <li>No se encontraron resultados</li>
          </ul>
        )}

        {noTerm && results?.length === 0 && (
          <ul className={dm ? s.dmhiden : s.hiden}>
            <li> </li>
          </ul>
        )}
      </span>
    </form>
  );
}

export default SearchBar;
