import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../redux/actions";
import CardV from "../Card V/CardV";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import s from "./Category.module.css";
import Pagination from "../Pagination/Pagination";

function Category() {
  //DARK MODE
  const dm = useSelector((state) => state.darkMode);

  let [active, setActive] = useState({ brand: false, price: false });
  // let [order, setOrder] = useState("All");
  let { name } = useParams();
  let dispatch = useDispatch();
  let products = useSelector((state) => state.productsByCategory);
  // let categories = useSelector(state => state.categories);
  let filter = useSelector((state) => state.filtered);
  let productBrands = [];
  let [currentPage, setCurrentPage] = useState(1);
  let [productsPerPage] = useState(12);
  let indexLastProduct = currentPage * productsPerPage;
  let indexFirstProduct = indexLastProduct - productsPerPage;
  let currentProduct =
    // active.brand === false && active.price === false?
    products.slice(indexFirstProduct, indexLastProduct);
  // : filter.slice(indexFirstProduct, indexLastProduct);

  let paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  for (let i = 0; i < filter.length; i++) {
    productBrands.push(filter[i].brand);
  }

  let Brands = [];

  productBrands.forEach((b) => {
    if (!Brands.includes(b)) {
      Brands.push(b);
    }
  });
  let initialLoad = true;

  useEffect(() => {
    dispatch(actions.getCategories());
    dispatch(actions.getProductsByCategory(name));
  }, [dispatch, name]);

  const filterBrands = (e) => {
    dispatch(actions.filterByBrand(e.target.value));
    setActive({ ...active, brand: true });
  };

  const sortPrice = (e) => {
    dispatch(actions.orderByPrice(e.target.value));
    setActive({ ...active, price: true });
  };

  return (
    <div className={dm ? s.dmbackground : s.background}>
      <NavBar />
      <div className={s.categoryPage}>
        <div className={s.selectors}>
          <select
            name="brand"
            value={active.brand}
            id="brand"
            onChange={filterBrands}
          >
            <option className={s.option}>Filtrar por marcas</option>
            {Brands &&
              Brands.map((brand, i) => (
                <option className={s.option} key={i} value={brand}>
                  {brand}
                </option>
              ))}
          </select>

          <select name="price" value={active.price} onChange={sortPrice}>
            <option className={s.option}>Ordenar por precio</option>
            <option className={s.option} value="asc">
              Precio -&nbsp;&nbsp;Precio +
            </option>
            <option className={s.option} value="desc">
              Precio +&nbsp;&nbsp;Precio -
            </option>
          </select>
        </div>
        <div className={s.results}>
          {currentProduct.length
            ? currentProduct.map((e) => (
                <CardV
                  key={e.product_id}
                  id={e.product_id}
                  brand={e.brand}
                  name={e.name}
                  image={e.image}
                  price={e.price}
                  category={e.category}
                  subcategory={e.subcategory}
                />
              ))
            : "https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"}
        </div>
        <div className={s.paginate}>
          <Pagination
            productsPerPage={productsPerPage}
            products={products.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Category;
