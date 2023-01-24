import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles2.css";
// import required modules
import { Pagination, Navigation } from "swiper";
import CardCarrusel from "../CardCarrusel/CardCarrusel";
import { getProducts } from "../../redux/actions";

function Carrusel({ products }) {
  //Para usuario registrado
  let dispatch = useDispatch();
  let user = useSelector((state) => state.loggedUser);
  // let allProducts = useSelector((state) => state.products);
  // let pCarrusel = [
  //   allProducts[3],
  //   allProducts[466],
  //   allProducts[679],
  //   allProducts[48],
  //   allProducts[253],
  //   allProducts[268],
  //   allProducts[44],
  //   allProducts[494],
  //   allProducts[547],
  //   allProducts[657],
  // ];

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="container">
      <Swiper
        slidesPerView={5}
        spaceBetween={15}
        slidesPerGroup={5}
        loop={false}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {products &&
          products.map((p) => (
            <SwiperSlide>
              <CardCarrusel
                favorite={p.favorite ? p.favorite : ""}
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

export default Carrusel;
