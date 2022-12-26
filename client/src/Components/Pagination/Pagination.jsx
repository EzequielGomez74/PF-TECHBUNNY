import React from "react";
import './Pagination.css';

export default function Pagination({
    productsPerPage,
    allProducts,
    paginate,
    currentPage,
}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allProducts/productsPerPage); i++){
        pageNumbers.push(i);
    }

    if(currentPage === pageNumbers.length + 1) {
        paginate(1);
    }

    return(
        <div className="pagination">
            <button className="btnPag" onClick={() => paginate(currentPage === 1 ? pageNumbers.length : currentPage -1)} >
            «{" "}
            </button>
            {
                pageNumbers && pageNumbers.map((number) => (
                    <button className="btnPag" key={number} onClick={() => paginate(number)}>
                        {currentPage === number ? <b>{number}</b> : number}
                    </button>
                ))
            }
            <button className="btnPag" onClick={() => paginate(currentPage === 0 ? currentPage : currentPage + 1)}>
            »{" "}
            </button>
        </div>
    )

}