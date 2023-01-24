import React, { useEffect,useRef,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'
import { getProductsByBrand,cleanProductsByBrand } from '../../redux/actions'
import CardV from '../Card V/CardV'
import s from './Brand.module.css'
import Pagination from "../Pagination/Pagination";
import loading from "../../images/loadingg.gif";

function Brand() {
   
    const dispatch = useDispatch()
    const { brand } = useParams()
    const dm = useSelector((state) => state.darkMode);

    const productsByBrand = useSelector(state => state.productsByBrand)
    const user = useSelector((state) => state.loggedUser);
    let initialLoad=useRef(true)


    //PAGINACION

    let [currentPage, setCurrentPage] = useState(1);
    let [productsPerPage] = useState(12);
    let indexLastProduct = currentPage * productsPerPage;
    let indexFirstProduct = indexLastProduct - productsPerPage;
    
  
    let currentProducts = productsByBrand.slice(indexFirstProduct, indexLastProduct);
  
    let paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  


    //razer, hiperx, logitech, redDragon, coolerMaster, Nintendo
   useEffect(()=> {
      if(initialLoad.current){
        dispatch(getProductsByBrand(brand))
        initialLoad.current=false
        return
      }
      console.log("brand componente brand",brand)
        window.scrollTo(0, 0);
        setCurrentPage(1);
   }, [dispatch])

   useEffect(() => () => dispatch(cleanProductsByBrand()), []);

  return (
    <div>
        <NavBar/>
        <section className={dm ? s.dmbrandPage : s.brandPage}>
        <div className={s.brandProducts}>
        {currentProducts.length ? (
            currentProducts.map((e) => (
              <div className={s.cardShadow}>
                <CardV
                  favorite={e.favorite}
                  user_id={user.user_id}
                  key={e.product_id}
                  product_id={e.product_id}
                  brand={e.brand}
                  name={e.name}
                  image={e.image}
                  price={e.price}
                  category={e.category}
                  subcategory={e.subcategory}
                />
              </div>
            ))
          ) : (
            <div className={s.loading}>
              <img src={loading} alt="" />
            </div>
          )}
        </div>
        <div className={s.paginate}>
          <Pagination
            productsPerPage={productsPerPage}
            products={productsByBrand.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
        </section>
        <Footer />
    </div>
  )
}

export default Brand