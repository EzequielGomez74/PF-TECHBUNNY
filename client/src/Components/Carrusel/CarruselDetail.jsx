import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles2.css";
// import required modules
import { Pagination, Navigation } from "swiper";
import CardV from "../Card V/CardV";
import { getProducts } from "../../redux/actions";
import * as actions from "../../redux/actions";
import { useParams } from "react-router-dom";

const addToSession = (seenProduct) => {
  let allSeenProducts =
    JSON.parse(sessionStorage.getItem("allSeenProducts")) || [];
  allSeenProducts.push(seenProduct);
  sessionStorage.setItem("allSeenProducts", JSON.stringify(allSeenProducts));
};

function CarruselDetail() {
  //Para usuario registrado
  let dispatch = useDispatch();
  let user = useSelector((state) => state.loggedUser);
  let catProducts = useSelector((state) => state.filtered);
  let detail = useSelector((state) => state.detail);
  const changeCatProducts = useRef(catProducts);
  const [carruselProducts, setCarruselProducts] = useState([]);
  const [carruselProductsExtended, setCarruselProductsExtended] = useState([]);
  const [sessionProducts, setSessionProducts] = useState([]);

  useEffect(() => {
    dispatch(actions.getProductsByCategory(detail.category));
    addToSession(detail);
  }, [detail]);

  useEffect(() => {
    // if (changeCatProducts.current.length !== catProducts.length) {
    setCarruselProducts(
      catProducts
        .filter((product) => product.subcategory === detail.subcategory)
        .sort((a, b) => 0.5 - Math.random())
        .slice(0, 10)
    );
    // if (carruselProducts.length)
    setCarruselProductsExtended(
      carruselProducts.concat(
        catProducts
          .sort((a, b) => 0.5 - Math.random())
          .slice(0, 10 - carruselProducts.length)
      )
    );
    // }
    console.log(carruselProductsExtended);
  }, [catProducts]);

  return (
    <div className="container">
      <Swiper
        slidesPerView={5}
        spaceBetween={15}
        slidesPerGroup={5}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {carruselProducts.length === 10
          ? carruselProducts.map((p) => (
              <SwiperSlide>
                <CardV
                  favorite={p.favorite}
                  key={p.product_id}
                  user_id={user.user_id}
                  product_id={p.product_id}
                  brand={p.brand}
                  name={p.name}
                  image={p.image}
                  price={p.price}
                  stock={p.stock}
                  category={p.category}
                  subcategory={p.subcategory}
                />
              </SwiperSlide>
            ))
          : carruselProductsExtended.map((p) => (
              <SwiperSlide>
                <CardV
                  favorite={p.favorite}
                  key={p.product_id}
                  user_id={user.user_id}
                  product_id={p.product_id}
                  brand={p.brand}
                  name={p.name}
                  image={p.image}
                  price={p.price}
                  stock={p.stock}
                  category={p.category}
                  subcategory={p.subcategory}
                />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}

export default CarruselDetail;
