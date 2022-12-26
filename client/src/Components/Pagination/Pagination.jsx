import React from "react";
import './Pagination.css';

export default function Pagination({
    productsperpage,
    allproducts,
    pagination,
    currentpage,
}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allproducts/productsperpage); i++){
        pageNumbers.push(i);
    }

    if(currentpage === pageNumbers.length + 1) {
        pagination(1);
    }

    return(
        <div className="btnPag">
            <button  onClick={() => pagination(currentpage === 1 ? pageNumbers.length : currentpage -1)} >
            «{" "}
            </button>
            {
                pageNumbers && pageNumbers.map((number) => (
                    <button key={number} onClick={() => pagination(number)}>
                        {currentpage === number ? <b>{number}</b> : number}
                    </button>
                ))
            }
            <button onClick={() => pagination(currentpage === 0 ? currentpage : currentpage + 1)}>
            »{" "}
            </button>
        </div>
    )

}