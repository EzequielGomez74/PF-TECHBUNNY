import React from 'react';
import s from './SearchBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function SearchBar() {
  return (
    <div>
        <input type="search" className={s.input} placeholder={`Buscar productos` } />
        <button className={s.inputIcon} ><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
    </div>
  )
}

export default SearchBar