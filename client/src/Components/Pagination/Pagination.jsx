import React, { useEffect } from "react";
import './Pagination.css';

export default function Pagination({productsPerPage, products, paginate, currentPage}){
    const pageNumbers = [];
  
    for(let i = 1; i <= Math.ceil(products/productsPerPage); i++){
      pageNumbers.push(i)
    }
    if(currentPage === pageNumbers.length + 1){
      paginate(1)
    }
  
    return(
      <div className="btnPag">
        <button disabled={currentPage === 1}
          onClick={() => 
            paginate(currentPage === 1 ? pageNumbers.length : currentPage -1)}
            > « </button>
  
        {
          pageNumbers && pageNumbers.map(number => (
            <button key = {number} onClick = {() => paginate(number)}>
              {currentPage === number ? <b>{number}</b> : number}
            </button>
          ))
        }
  
        <button disabled={currentPage === pageNumbers.length} onClick={() => 
        paginate(currentPage === 0 ? currentPage : currentPage + 1)}
        > » </button>
      </div>
    )
  };
  


  
  