import React, { useEffect, useState } from 'react';
import s from './SearchBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { getProducts , getSearchResults, getResults, getSearchTerm } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)
  const history = useHistory();
  const results = useSelector(state => state.results)

  useEffect(()=>{
    dispatch(getProducts())
  }, [dispatch])

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    dispatch(getSearchResults(products, searchTerm))
  }

  const handleClick = (e) => {
    // e.preventDefault()
    setSearchTerm(e.target.value)
    dispatch(getSearchTerm(searchTerm))
    dispatch(getResults(products, searchTerm))
    history.push('/results');
  }

  return (
    <div>
        <input type="text" value={searchTerm} onChange={handleChange} className={s.input} placeholder={`Buscar productos` } />
        <button className={s.inputIcon} onClick={handleClick} ><FontAwesomeIcon icon={faMagnifyingGlass}/></button>

        <div>
            { searchTerm ? results.map(p => <div>
              <img src={p.image} alt={p.name} />
              <span> {p.name} </span>
            </div> ) : <span>No hay resultados</span> }
        </div>
    </div>
  )
}

export default SearchBar


// desabilitar si searchTerm no tiene longitud