import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles2.css";
// import required modules
import { Pagination, Navigation } from "swiper";
import CardV from '../Card V/CardV';

const products = [
    {
    "product_id": 1,
    "name": "Equipo AMD Athlon 3000G – 8Gb – SSD – Radeon™ Vega 3 Graphics",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2015/07/ath.jpg",
    "price": "325",
    "stock": 12,
    "soldCount": 5,
    "brand": "Amd",
    "subcategory": "Equipos AMD",
    "category": "Equipos armados",
    "active": true
    },
    {
    "product_id": 2,
    "name": "Equipo AMD Athlon 3000G Gamer – Radeon™ Vega 3 Graphics",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2015/01/3-1.jpg",
    "price": "375",
    "stock": 2,
    "soldCount": 5,
    "brand": "Amd",
    "subcategory": "Equipos AMD",
    "category": "Equipos armados",
    "active": true
    },
    {
    "product_id": 3,
    "name": "Equipo AMD Ryzen 3 4350G Pro Gamer – Radeon Graphics",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2015/01/3-1.jpg",
    "price": "575",
    "stock": 7,
    "soldCount": 5,
    "brand": "Amd",
    "subcategory": "Equipos AMD",
    "category": "Equipos armados",
    "active": true
    },
    {
    "product_id": 4,
    "name": "Equipo AMD Ryzen 5 4650G Pro Gamer – Radeon Graphics",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2022/01/AMD-1-1-1-600x602.png",
    "price": "625",
    "stock": 2,
    "soldCount": 6,
    "brand": "Amd",
    "subcategory": "Equipos AMD",
    "category": "Equipos armados",
    "active": true
    },
    {
    "product_id": 5,
    "name": "Equipo AMD Ryzen 5 5600G Gamer – Radeon Graphics",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2022/01/AMD-1-1-1-600x602.png",
    "price": "675",
    "stock": 18,
    "soldCount": 5,
    "brand": "Amd",
    "subcategory": "Equipos AMD",
    "category": "Equipos armados",
    "active": true
    },
    {
    "product_id": 6,
    "name": "Equipo AMD Ryzen 7 5700G Pro Gamer – 16Gb – SSD – Radeon Graphics",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2016/11/AMD-1-1-600x602.png",
    "price": "900",
    "stock": 4,
    "soldCount": 7,
    "brand": "Amd",
    "subcategory": "Equipos AMD",
    "category": "Equipos armados",
    "active": true
    },
    {
    "product_id": 7,
    "name": "Equipo AMD Ryzen 5 3600 Pro Gamer con GTX1650",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2017/07/AMD-5-1-600x602.jpg",
    "price": "1090",
    "stock": 4,
    "soldCount": 7,
    "brand": "Amd",
    "subcategory": "Equipos AMD",
    "category": "Equipos armados",
    "active": true
    },
    {
    "product_id": 8,
    "name": "Equipo AMD Ryzen 5 3600 Full Gamer  – 16Gb – SSD –  GTX1660",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2017/07/AMD-5-1-600x602.jpg",
    "price": "1350",
    "stock": 12,
    "soldCount": 5,
    "brand": "Amd",
    "subcategory": "Equipos AMD",
    "category": "Equipos armados",
    "active": true
    },
    {
    "product_id": 9,
    "name": "Equipo AMD Ryzen 5 3600 Full Gamer – 16Gb – RX6500XT",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2021/10/xz10r-600x600.jpg",
    "price": "1599.99",
    "stock": 9,
    "soldCount": 5,
    "brand": "Amd",
    "subcategory": "Equipos AMD",
    "category": "Equipos armados",
    "active": true
},
{   "product_id": 10,
    "name": "Equipo AMD Ryzen 5 5600X Full Gamer – 16gb – SSD – RTX3050",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2016/09/ryzrtx4-1-600x597.jpg",
    "price": "1650.00",
    "stock": 6,
    "soldCount": 5,
    "brand": "Amd",
    "subcategory": "Equipos AMD",
    "category": "Equipos armados",
    "active": true
  },
  ]


 function Carrusel() {
    return (
        <div className='container'>
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
            { products.map(p => (<SwiperSlide>
                <CardV
                key={p.product_id}
                id={p.product_id}
                brand={p.brand}
                name={p.name}
                image={p.image}
                price={p.price}
                category={p.category}
                subcategory={p.subcategory}
                />             
                </SwiperSlide>)) }
          </Swiper>
        </div>
    );
}

export default Carrusel