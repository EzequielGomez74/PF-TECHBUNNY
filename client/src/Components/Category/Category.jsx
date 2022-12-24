import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from '../../redux/actions';
import CardV from "../Card V/CardV";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

function Category(){

    let [active, setActive] = useState({brand: false}); 
    let {name} = useParams();
    let dispatch = useDispatch();
    let products = useSelector(state => state.productsByCategory);
    let categories = useSelector(state => state.categories);
    let filter = useSelector(state => state.filtered);
    let productBrands = [];

    for (let i = 0; i < products.length; i++) {
        productBrands.push(products[i].brand)
    }
    let Brands = [];
    productBrands.forEach(b => {
        if (!Brands.includes(b)){
            Brands.push(b)
        }
    })

    useEffect(() => {
        dispatch(actions.getCategories())
        dispatch(actions.getProductsByCategory(name))
    },[dispatch, name])

    const filterBrands = (e) => {
        dispatch(actions.filterByBrand(products, e.target.value))
        setActive({...active, brand: true})
    }

    return(
        <div>
        <NavBar/>
        <div>
            {active.brand ? filter.map(
                (e) => <CardV
                key= {e.product_id}
                id= {e.product_id}
                brand= {e.brand}
                name = {e.name}
                image= {e.image}
                price= {e.price}
                category= {e.category}
                subcategory= {e.subcategory}
                />) : products.map(
                (e) => <CardV
                key= {e.product_id}
                id= {e.product_id}
                brand= {e.brand}
                name = {e.name}
                image= {e.image}
                price= {e.price}
                category= {e.category}
                subcategory= {e.subcategory}
                />
            )}
        </div>
        <div>
          <select name='brand' value={active.brand} id="brand" onChange={filterBrands}  >
            <option>Filtrar por marcas</option>
            {Brands && Brands.map((brand, i) => <option key={i} value={brand} >{brand}</option>)}
          </select>
            
        </div>
        
        <Footer/>
        </div>
    )
}

export default Category;