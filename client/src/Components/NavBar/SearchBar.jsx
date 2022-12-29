import React from 'react';
import s from './SearchBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';

function SearchBar() {
  const dm = useSelector(state => state.darkMode);
  return (
    <div>
        <input type="search" className={dm ? s.dminput : s.input} placeholder={`Buscar productos` } />
        <button className={dm ? s.dminputIcon : s.inputIcon} ><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
    </div>
  )
}

export default SearchBar