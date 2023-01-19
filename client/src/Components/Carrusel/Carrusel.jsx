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

// const products = [
//     {
//       "product_id": 4,
//       "name": "Equipo AMD Ryzen 5 4650G Pro Gamer – Radeon Graphics",
//       "image": "https://thotcomputacion.com.uy/wp-content/uploads/2022/01/AMD-1-1-1-600x602.png",
//       "price": "625",
//       "stock": 2,
//       "soldCount": 6,
//       "brand": "Amd",
//       "subcategory": "Equipos AMD",
//       "category": "Equipos armados",
//       "active": true,
//       "favorite": false,
//     },
//     {
//     "product_id": 466,
//     "name": "Monitor Viewsonic XG2402 144hz 1ms 24″",
//     "image": "https://thotcomputacion.com.uy/wp-content/uploads/2022/02/xg240220350_ed72a66aa2f1447285415c42f8f0ca1b.jpg",
//     "price": "375",
//     "stock": 2,
//     "soldCount": 5,
//     "brand": "ViewSonic",
//     "subcategory": "Monitores",
//     "category": "Monitores y TV",
//     "active": true,
//     "favorite": null,
//     },
//     {
//     "product_id": 680,
//     "name": "Auricular Razer Blackshark v2 X Green",
//     "image": "https://thotcomputacion.com.uy/wp-content/uploads/2021/09/blackshark2520v295302_46442be93d414e12994e76d2347b6814.jpg",
//     "price": "59",
//     "stock": 7,
//     "soldCount": 5,
//     "brand": "Razer",
//     "subcategory": "Auriculares",
//     "category": "Periféricos",
//     "active": true,
//     "favorite": null,
//     },
//     {
//     "product_id": 49,
//     "name": "Notebook Asus M515 AMD RYZEN 3 3250U/4Gb/128Gb PCIe/15,6/W10",
//     "image": "https://thotcomputacion.com.uy/wp-content/uploads/2022/03/25C32597515EA-EJ1023W72062_fdcf776bea5e485b9106330551c64e7239619_eba4d99635394345a0fe785eda5cc37d-600x600.png",
//     "price": "550",
//     "stock": 2,
//     "soldCount": 6,
//     "brand": "Asus",
//     "subcategory": "Notebooks",
//     "category": "Notebooks",
//     "active": true,
//     "favorite": null,
//     },
//     {
//     "product_id": 254,
//     "name": "PU Intel Core i7-11700K Rocket Lake 1200",
//     "image": "https://thotcomputacion.com.uy/wp-content/uploads/2021/04/intel84961_34aed23e49f54983b938167daf6b2a84.png",
//     "price": "590",
//     "stock": 18,
//     "soldCount": 5,
//     "brand": "Intel",
//     "subcategory": "Procesadores INTEL",
//     "category": "Procesadores",
//     "active": true,
//     "favorite": null,
//     },
//     {
//     "product_id": 269,
//     "name": "Disipador DeepCool Gammaxx GT A-RGB",
//     "image": "https://thotcomputacion.com.uy/wp-content/uploads/2022/01/Disipador2520DeepCool2520Gammaxx2520GT2520A-RGB88477_8c5bec00c92044b280f88f3c46e296f1-600x633.png",
//     "price": "45",
//     "stock": 4,
//     "soldCount": 7,
//     "brand": "DeepCool",
//     "subcategory": "Para CPU",
//     "category": "Cooling",
//     "active": true,
//     "favorite": null,
//     },
//     {
//     "product_id": 45,
//     "name": "Microsoft Xbox Serie X – incluye control inalámbrico",
//     "image": "https://thotcomputacion.com.uy/wp-content/uploads/2021/11/xbx93033_ce586eb4263a4b029491fc27138d79d0-600x601.jpg",
//     "price": "1350",
//     "stock": 4,
//     "soldCount": 7,
//     "brand": "Xbox",
//     "subcategory": "Consolas",
//     "category": "Consolas",
//     "active": true,
//     "favorite": null,
//     },
//     {
//     "product_id":  495,
//     "name": "Silla HHGears XL 300 Series Black and White",
//     "image": "https://thotcomputacion.com.uy/wp-content/uploads/2021/12/xl300nb90245_6bda20fd1c7b42e29da06d744426ab6b.jpg",
//     "price": "235",
//     "stock": 12,
//     "soldCount": 5,
//     "brand": "HHGears",
//     "subcategory": "Sillas Gamer",
//     "category": "Sillas",
//     "active": true,
//     "favorite": null,
//     },
//     {
//     "product_id": 548,
//     "name": "Teclado Razer Blackwidow V3 PRO cableado / inalámbrico",
//     "image": "https://thotcomputacion.com.uy/wp-content/uploads/2017/12/bv3-600x563.png",
//     "price": "250",
//     "stock": 9,
//     "soldCount": 5,
//     "brand": "Razer",
//     "subcategory": "Teclados",
//     "category": "Periféricos",
//     "active": true,
//     "favorite": null,
// },
// {   "product_id": 658,
//     "name": "Mouse Logitech PRO X Superlight Gaming Magenta",
//     "image": "https://thotcomputacion.com.uy/wp-content/uploads/2022/03/Superlight-Magenta-163222_ddc2dfea6c1f4351b3ff872eafa1e454-600x600.jpg",
//     "price": "134",
//     "stock": 6,
//     "soldCount": 5,
//     "brand": "Logitech",
//     "subcategory": "Mouse",
//     "category": "Periféricos",
//     "active": true,
//     "favorite": null,
//   },
//   ]

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
