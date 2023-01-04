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
      "product_id": 10,
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
    {
    "product_id": 540,
    "name": "Teclado Razer Cynosa V2 Chroma",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2021/08/D_NQ_NP_895352-MLU44003755855_112020-O20724_08095893808744528106d10ad0df0be5.jpg",
    "price": "40",
    "stock": 2,
    "soldCount":8,
    "brand": "Razer",
    "subcategory": "Teclados",
    "category": "Perifericos",
    "active": true
    },
    {
    "product_id": 597,
    "name": "Mouse Razer DeathAdder V2 Lite",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2019/10/5756586deathadder_5ff3e951532340a68ad2ba68a699fe6c.png",
    "price": "30",
    "stock": 5,
    "soldCount": 10,
    "brand": "Razer",
    "subcategory": "Teclado",
    "category": "Perifericos",
    "active": true
    },
    {
    "product_id": 488,
    "name": "Monitor ASUS ROG SWIFT PG259QN BK 360Hz G-SYNC IPS HDR",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2021/12/atr36086957_66a7cd36671047db98ef4e2e193a1b7d-600x600.jpg",
    "price": "625",
    "stock": 2,
    "soldCount": 6,
    "brand": "Amd",
    "subcategory": "Equipos AMD",
    "category": "Equipos armados",
    "active": true
    },
    {
    "product_id": 179,
    "name": "Mother MSI B550 GAMING EDGE WiFi",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2021/04/b5502520m2520e14028_1667076e3da64138af1c387d77a110e8-600x597.jpg",
    "price": "300",
    "stock": 2,
    "soldCount": 7,
    "brand": "Mother",
    "subcategory": "Motherboards",
    "category": "Motherboards",
    "active": true
    },
    {
    "product_id": 693,
    "name": "Auricular Razer Opus X Mercury",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2021/08/opusxw59605_e96e9726ce914820a294afe9b0076757.jpg",
    "price": "125",
    "stock": 2,
    "soldCount": 5,
    "brand": "Razer",
    "subcategory": "Auriculares",
    "category": "Perifericos",
    "active": true
    },
    {
    "product_id":  46,
    "name": "Sony PlayStation 5 Standard Edition",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2021/10/ps5s9701_44ac75818a4d4fedb7f0cf41ec19b905-600x600.jpg",
    "price": "1389",
    "stock": 8,
    "soldCount": 5,
    "brand": "PlayStation",
    "subcategory": "Consolas",
    "category": "Consolas",
    "active": true
    },
    {
    "product_id": 818,
    "name": "Control Nintendo Switch – Joystick Pro Controller",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2022/03/61drpi3cYUL._SL1258_78634_9c8b16928a854e6a98dc691556c73f47-600x567.jpg",
    "price": "95",
    "stock": 5,
    "soldCount": 10,
    "brand": "Nintendo",
    "subcategory": "Consolas",
    "category": "Consolas",
    "active": true
    },
    {
    "product_id": 822,
    "name": "Parlante Logitech Z407 PC Bluetooth",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2021/10/z407-gallery-014117_b37ac39b87624dbf9a8f5e2eac0cd6b1-600x515.png",
    "price": "134",
    "stock": 5,
    "soldCount": 10,
    "brand": "Logitech",
    "subcategory": "Parlantes",
    "category": "Perifericos",
    "active": true
},
{   "product_id": 454,
    "name": "Samsung Curvo C24F390FHL 24″",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2018/02/s-390-600x600.png",
    "price": "225",
    "stock": 12,
    "soldCount": 5,
    "brand": "Samsung",
    "subcategory": "Monitores",
    "category": "Monitores y TV",
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
                stock={p.stock}
                category={p.category}
                subcategory={p.subcategory}
                />             
                </SwiperSlide>)) }
          </Swiper>
        </div>
    );
}

export default Carrusel
