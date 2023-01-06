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
    "product_id": 466,
    "name": "Monitor Viewsonic XG2402 144hz 1ms 24″",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2022/02/xg240220350_ed72a66aa2f1447285415c42f8f0ca1b.jpg",
    "price": "375",
    "stock": 2,
    "soldCount": 5,
    "brand": "ViewSonic",
    "subcategory": "Monitores",
    "category": "Monitores y TV",
    "active": true
    },
    {
    "product_id": 680,
    "name": "Auricular Razer Blackshark v2 X Green",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2021/09/blackshark2520v295302_46442be93d414e12994e76d2347b6814.jpg",
    "price": "575",
    "stock": 7,
    "soldCount": 5,
    "brand": "Razer",
    "subcategory": "Auriculares",
    "category": "Periféricos",
    "active": true
    },
    {
    "product_id": 49,
    "name": "Notebook Asus M515 AMD RYZEN 3 3250U/4Gb/128Gb PCIe/15,6/W10",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2022/03/25C32597515EA-EJ1023W72062_fdcf776bea5e485b9106330551c64e7239619_eba4d99635394345a0fe785eda5cc37d-600x600.png",
    "price": "550",
    "stock": 2,
    "soldCount": 6,
    "brand": "Asus",
    "subcategory": "Notebooks",
    "category": "Notebooks",
    "active": true
    },
    {
    "product_id": 254,
    "name": "PU Intel Core i7-11700K Rocket Lake 1200",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2021/04/intel84961_34aed23e49f54983b938167daf6b2a84.png",
    "price": "675",
    "stock": 18,
    "soldCount": 5,
    "brand": "Intel",
    "subcategory": "Procesadores INTEL",
    "category": "Procesadores",
    "active": true
    },
    {
    "product_id": 269,
    "name": "Disipador DeepCool Gammaxx GT A-RGB",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2022/01/Disipador2520DeepCool2520Gammaxx2520GT2520A-RGB88477_8c5bec00c92044b280f88f3c46e296f1-600x633.png",
    "price": "45",
    "stock": 4,
    "soldCount": 7,
    "brand": "DeepCool",
    "subcategory": "Para CPU",
    "category": "Cooling",
    "active": true
    },
    {
    "product_id": 380,
    "name": "SSD Patriot Burst Elite 480GB 2.5»",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2021/11/pb460_0d6f2f61fc8344689740aeb5ee2ff50a.png",
    "price": "65",
    "stock": 4,
    "soldCount": 7,
    "brand": "Patriot",
    "subcategory": "Discos internos SSD",
    "category": "Almacenamiento",
    "active": true
    },
    {
    "product_id":  495,
    "name": "Silla HHGears XL 300 Series Black and White",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2021/12/xl300nb90245_6bda20fd1c7b42e29da06d744426ab6b.jpg",
    "price": "235",
    "stock": 12,
    "soldCount": 5,
    "brand": "HHGears",
    "subcategory": "Sillas Gamer",
    "category": "Sillas",
    "active": true
    },
    {
    "product_id": 527,
    "name": "Pendrive Patriot Push+ 64Gb",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2021/09/patriot2520push83582_97e6652962b04eb995c3d8b154d3e4f1.jpg",
    "price": "11",
    "stock": 9,
    "soldCount": 5,
    "brand": "Patriot",
    "subcategory": "Pendrives",
    "category": "Pendrives",
    "active": true
},
{   "product_id": 574,
    "name": "Teclado Logitech G915 TKL inalámbrico",
    "image": "https://thotcomputacion.com.uy/wp-content/uploads/2020/11/1592907615_1566774-600x600.jpg",
    "price": "290",
    "stock": 6,
    "soldCount": 5,
    "brand": "Logitech",
    "subcategory": "Teclados",
    "category": "Periféricos",
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
