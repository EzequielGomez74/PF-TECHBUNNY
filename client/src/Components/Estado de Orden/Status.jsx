import React, { useState, useEffect, useRef } from 'react'
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getOrderStatus } from '../../redux/actions';
import s from './Status.module.css'

function Status() {
    const dm = useSelector((state) => state.darkMode);

    const { userId, orderId } = useParams()
    const orderStatus = useSelector((state)=> state.orderStatus)
    const products = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const initialLoad = useRef(true);
    const [check, setCheck] = useState(0);

    useEffect(() => {
        if (initialLoad.current) {
            dispatch(getOrderStatus(userId, orderId))
            initialLoad.current = false;
            return;
        }
        orderStatus.forEach((o) => {
            const orderProducts = [];
            for (let i = 0; i < o.Products.length; i++) {
              orderProducts.push(
                products.find((p) => p.product_id === o.Products[i].product_id)
              );
            }
            o.Products = orderProducts;
        });
        if (orderStatus.length > 0) setCheck(Object.keys(orderStatus[0].Products[0]).length);
    }, [dispatch, orderStatus, userId, orderId, products, orderStatus.length, check]);

  return (
    <div className={dm? s.dmstatusPage : s.statusPage}>
        <NavBar />
        <section className={dm ? s.dmprofileSection : s.profileSection}>
        <div className={s.profileOrdersHistory}>
            {orderStatus.length ? orderStatus.map((o) => (
                    <div className={s.orderContainer}>
                      <div
                        className={dm ? s.dmorderByUserInfo : s.orderByUserInfo}
                      >
                        <span>Order N° {o.order_id}</span>
                        <span>
                          Status:{" "}
                          {o.status === "processed"
                            ? "Procesado"
                            : o.status === "canceled"
                            ? "Cancelado"
                            : "Completado"}
                        </span>
                      </div>
                      <ul className={s.orderProductsContainer}>
                        {o.Products?.map((p) => (
                          <li className={s.liOrderElement}>
                            <img
                              className={s.productOrderImage}
                              src={p.image}
                              alt={p.product_id}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div className={s.productOrderInfo}>
                              <span>{p.name}</span>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <span className={dm ? s.dmprice : s.price}>
                                US$ {p.price}
                              </span>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <span>{p.count}</span>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                          </li>
                        ))}
                      </ul>
                      <span className={s.orderTotal}>Total: US$ {o.total.toFixed(2)}</span>
                    </div>
                  ))
                : <div className={s.orderContainer}>
                  No se encontró una order con el id indicado.
                </div>
            }
        </div>
        </section>
        <Footer />
    </div>
  )
}

export default Status