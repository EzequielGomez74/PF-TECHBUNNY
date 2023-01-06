import React, { useEffect, useState, useRef } from "react";
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

  // let [order, setOrder] = useState("All");
  let { name } = useParams();
  let dispatch = useDispatch();
  let products = useSelector((state) => state.productsByCategory);
  // let categories = useSelector(state => state.categories);
  let productsBackup = useSelector((state) => state.filtered);
  const [filterPanel, setFileterPanel] = useState({
    price: "none",
    brand: "none",
  });
  let productBrands = [];
  let [currentPage, setCurrentPage] = useState(1);
  let [productsPerPage] = useState(12);
  let indexLastProduct = currentPage * productsPerPage;
  let indexFirstProduct = indexLastProduct - productsPerPage;

  let currentProduct = products.slice(indexFirstProduct, indexLastProduct);

  let paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  for (let i = 0; i < productsBackup.length; i++) {
    productBrands.push(productsBackup[i].brand);
  }

  let Brands = [];

  productBrands.forEach((b) => {
    if (!Brands.includes(b)) {
      Brands.push(b);
    }
  });

  let initialLoad = useRef(true);
  let nameChange = useRef(name);

  useEffect(() => {
    if (nameChange.current !== name) {
      initialLoad.current = true;
      nameChange.current = name;
    }
    console.log("hola");
    if (initialLoad.current) {
      dispatch(actions.getCategories());
      dispatch(actions.getProductsByCategory(name));
      initialLoad.current = false;
      return;
    }
    console.log("chau");

    dispatch(actions.filterByBrand(filterPanel.brand));
    dispatch(actions.orderByPrice(filterPanel.price));
    console.log(filterPanel.brand, filterPanel.price);
  }, [dispatch, name, filterPanel, nameChange]);

  const handleFiltersChange = (e) => {
    setFileterPanel({ ...filterPanel, [e.target.id]: e.target.value });
  };

  return (
    <div className={dm ? s.dmbackground : s.background}>
      <NavBar />
      <div className={s.categoryPage}>
        <div className={s.selectors}>
          <select
            name="brand"
            // value={active.brand}
            id="brand"
            onChange={(e) => handleFiltersChange(e)}
          >
            <option value="none" selected className={s.option}>
              Filtrar por marcas
            </option>
            {Brands &&
              Brands.map((brand, i) => (
                <option className={s.option} key={i} value={brand}>
                  {brand}
                </option>
              ))}
          </select>

          <select
            name="price"
            id="price"
            selected
            // value={active.price}
            onChange={(e) => handleFiltersChange(e)}
          >
            <option value="none" className={s.option}>
              Ordenar por precio
            </option>
            <option className={s.option} value="asc">
              Precio -&nbsp;&nbsp;Precio +
            </option>
            <option className={s.option} value="desc">
              Precio +&nbsp;&nbsp;Precio -
            </option>
          </select>
        </div>
        <div className={s.results}>
          {currentProduct.length ? (
            currentProduct.map((e) => (
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
          ) : (
            <img
              src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
              alt=""
            />
          )}
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