import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../redux/actions";
import CardV from "../Card V/CardV";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import s from "./Category.module.css";
import loading from "../../images/loadingg.gif";
import Pagination from "../Pagination/Pagination";

function Category() {
  //DARK MODE
  const dm = useSelector((state) => state.darkMode);
  //Para usuario registrado
  let user = useSelector((state) => state.loggedUser);
  // let [order, setOrder] = useState("All");
  let { name } = useParams();
  let dispatch = useDispatch();
  let products = useSelector((state) => state.productsByCategory);
  // let categories = useSelector(state => state.categories);
  let productsBackup = useSelector((state) => state.filtered);

  const [filterPanel, setFilterPanel] = useState({
    price: "none",
    brand: "none",
    subcategory: "none",
  });
  let productBrands = [];
  let productSubcategories = [];
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
  let Subcategories = [];

  productBrands.forEach((b) => {
    if (!Brands.includes(b)) {
      Brands.push(b);
    }
  });

  //Array con subcategorias para Perifericos
  if (name === "Periféricos") {
    for (let i = 0; i < productsBackup.length; i++) {
      productSubcategories.push(productsBackup[i].subcategory);
    }

    productSubcategories.forEach((b) => {
      if (!Subcategories.includes(b)) {
        Subcategories.push(b);
      }
    });
  }

  let initialLoad = useRef(true);
  let nameChange = useRef(name);

  useEffect(() => {
    if (nameChange.current !== name) {
      initialLoad.current = true;
      nameChange.current = name;
      setFilterPanel({
        price: "none",
        brand: "none",
        subcategory: "none",
      });
    }
    if (initialLoad.current) {
      dispatch(actions.getCategories());
      dispatch(actions.getProductsByCategory(name));
      initialLoad.current = false;
      return;
    }

    setCurrentPage(1);
    if (name === "Periféricos")
      dispatch(actions.filterBy(filterPanel.subcategory, filterPanel.brand));
    else dispatch(actions.filterBy("none", filterPanel.brand));
    dispatch(actions.sortByPrice(filterPanel.price));
  }, [dispatch, name, filterPanel, nameChange]);

  useEffect(() => () => dispatch(actions.cleanCategoryProducts()), []);

  const handleFiltersChange = (e) => {
    setFilterPanel({ ...filterPanel, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className={dm ? s.dmbackground : s.background}>
      <NavBar />
      <div className={s.categoryPage}>
        <div className={s.selectors}>
          <select
            name="brand"
            value={
              filterPanel.brand === "none"
                ? "Filtrar por marcas"
                : filterPanel.brand
            }
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

          {name === "Periféricos" && (
            <select
              name="subcategory"
              value={
                filterPanel.subcategory === "none"
                  ? "Filtrar por subcategoría"
                  : filterPanel.subcategory
              }
              id="subcategory"
              onChange={(e) => handleFiltersChange(e)}
            >
              <option value="none" selected className={s.option}>
                Filtrar por subcategoría
              </option>
              {Subcategories &&
                Subcategories.map((subcategory, i) => (
                  <option className={s.option} key={i} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
            </select>
          )}

          <select
            name="price"
            id="price"
            selected
            value={
              filterPanel.price === "none"
                ? "Ordenar por precio"
                : filterPanel.price
            }
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
          {currentProduct.length && currentProduct[0] !== null ? (
            currentProduct.map((e) => (
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
          ) : currentProduct[0] === null ? (
            <div className={s.notFoundContainer}>
              <span className={s.notFound}>No se encontraron productos</span>
            </div>
          ) : (
            <div className={s.loading}>
              <img src={loading} alt="" />
            </div>
          )}
        </div>
        {currentProduct[0] !== null && currentProduct.length > 0 ? (
          <div className={s.paginate}>
            <Pagination
              productsPerPage={productsPerPage}
              products={products.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        ) : (
          <div className={s.spaceDown}></div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Category;

//eze le manda las imagenes de brands a ger para que las meta en cloudinary y que se agregue un atributo nuevo l modelo products que sea brandimages, en este componente se hace lo mismo para el array brands solo que con las imagenes