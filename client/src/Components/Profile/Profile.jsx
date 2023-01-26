import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { updateUserInfo } from "../../redux/actions";
import s from "./Profile.module.css";
import img from "../../Photos/conejoperfil.png";
import { useEffect, useRef } from "react";
import { allOrdersByUser, getOrder, updateOrder } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faSpinner, faCheck } from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const user = useSelector((state) => state.loggedUser);
  const orders = useSelector((state) => state.ordersByUser);
  const products = useSelector((state) => state.products);
  const dm = useSelector((state) => state.darkMode);
  const initialLoad = useRef(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const [check, setCheck] = useState(0);

  const [input, setInput] = useState({
    profilePicture: "",
    username: "",
    name: "",
    surname: "",
    email: "",
    billingAddress: "",
    zipCode: "",
  });

  useEffect(() => {
    if (orders.length > 0) {
      setCheck(Object.keys(orders[0].Products[0]).length);

      orders.forEach((o) => {
        const monthNames = [
          "enero",
          "febrero",
          "marzo",
          "abril",
          "mayo",
          "junio",
          "julio",
          "agosto",
          "septiembre",
          "octubre",
          "noviembre",
          "diciembre",
        ];
        if (o.createdAt && typeof o.createdAt === "string") {
          const newCreatedAt = o.createdAt
            .split("T")[0]
            .split("-")
            .reverse()
            .map((dateElement, index) => {
              console.log(dateElement);
              if (index === 1) {
                let month = monthNames[0];
                return month;
              }
              return dateElement;
            });

          o.createdAt = [...newCreatedAt];
        }

        for (let i = 0; i < o.Products.length; i++) {
          let product = products.find(
            (p) => p.product_id === o.Products[i].product_id
          );
          if (product) {
            for (let key in product) {
              if (!o.Products[i].hasOwnProperty(key)) {
                o.Products[i][key] = product[key];
              }
            }
          }
        }
      });
    }
    if (initialLoad.current) {
      dispatch(allOrdersByUser(user.user_id));
      initialLoad.current = false;
      return;
    }

    console.log(orders);
  }, [dispatch, orders, user.user_id, products, orders.length, check]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  function parseRelativeDate(date) {
    const month = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    var s = new Date(date).toISOString();
    s = s.split("-");
    const y = s[0];
    const m = month[parseInt(s[1])-1];
    const d = s[2].slice(0, 2);
    //console.log(d, " ", m, " ", y, " - ", s);
    return `${d} de ${m} de ${y}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(user.user_id, input));
  };

  const handleEditProfile = () => {
    history.push("/editProfile");
  };

  const handleCompleteOrder = (user_id, order_id) => {
    console.log("sale el dispatch");
    dispatch(getOrder(user_id, order_id));
    history.push("/payment");
  };

  return (
    <div className={dm ? s.dmprofilePage : s.profilePage}>
      <NavBar />
      <div className={dm ? s.dmprofileSection : s.profileSection}>
        {user.username && user.email ? (
          <div>
            <section className={s.profileImgInfoSection}>
              <div className="imgContainer">
                <img
                  src={img}
                  alt="bunny login"
                  className={dm ? s.dmimg : s.img}
                />
              </div>
              <div className={dm ? s.dmprofileInfo : s.profileInfo}>
                <span>
                  <strong>Nombre de usuario:</strong>&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  {user.username}{" "}
                </span>
                <span>
                  <strong>Nombre:</strong>&nbsp;&nbsp;&nbsp;&nbsp; {user.name}{" "}
                </span>
                <span>
                  <strong>Apellido:</strong>&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  {user.surname}{" "}
                </span>
                <span>
                  <strong>Email:</strong>&nbsp;&nbsp;&nbsp;&nbsp; {user.email}{" "}
                </span>
                <span>
                  <strong>Dirección:</strong>&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  {user.billingAddress}{" "}
                </span>
                <span>
                  <strong>Código ZIP:</strong>&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  {user.zipCode}{" "}
                </span>
                <button onClick={handleEditProfile}>Editar información</button>
              </div>
            </section>
            <section className={s.profileOrdersHistory}>
              <h3 className={dm ? s.dmorderTitle : s.orderTitle}>
                Historial de Ordenes
              </h3>
              <br />
              {orders.length ? (
                orders.map((o) => (
                  <div className={s.orderContainer}>
                    <div
                      className={dm ? s.dmorderByUserInfo : s.orderByUserInfo}
                    >
                      <span>Order N° {o.order_id}</span>
                      <span>
                        {o.relativeDateAdded !== 0
                          ? parseRelativeDate(o.relativeDateAdded)
                          : `${o.createdAt[0]} de ${o.createdAt[1]} de ${o.createdAt[2]}`}
                      </span>
                      <span>
                        Status:{" "}
                        {o.status === "processed" ? (
                          <p>
                            Procesado <FontAwesomeIcon icon={faSpinner} />
                          </p>
                        ) : o.status === "canceled" ? (
                          <p>
                            Cancelado <FontAwesomeIcon icon={faXmark} />
                          </p>
                        ) : (
                          <p>
                            Completado <FontAwesomeIcon icon={faCheck} />
                          </p>
                        )}
                      </span>
                    </div>
                    




                    <ul className={s.orderProductsContainer}>
                      {o.Products?.map((p) => (
                        <li className={s.liOrderElement}>
                          <Link to={`/detail/${p.product_id}`}>
                            <img
                              className={s.productOrderImage}
                              src={p.image}
                              alt={p.product_id}
                            />
                          </Link>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <div className={s.productOrderInfo}>
                            <span>{p.name}</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className={dm ? s.dmprice : s.price}>
                              US$ {p.price}
                            </span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>Cantidad: {p.count} unidades</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>
                        </li>
                      ))}
                    </ul>
                    <span className={s.orderTotal}>
                      Total: US$ {o.total.toFixed(2)}
                    </span>

                    {o.status === "processed" && (
                      <div className={dm? s.dmbtnPedido : s.btnPedido}>
                        {" "}
                        <button className={dm? s.dmbtnCompletarPedido : s.btnCompletarPedido}
                          onClick={() =>
                            handleCompleteOrder(o.user_id, o.order_id)
                          }
                        >
                          Completar pedido
                        </button>
                        <button className={dm? s.dmbtnCancelarPedido : s.btnCancelarPedido}
                          onClick={() =>
                            dispatch(
                              updateOrder(o.order_id, { status: "canceled" })
                            )
                          }
                        >
                          Cancelar pedido
                        </button>
                      </div>
                    )}


                  </div>
                ))
              ) : (
                <div className={s.noOrder}>
                  <span>Todavía no has realizado pedidos</span>
                </div>
              )}
            </section>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={dm ? s.dmprofileForm : s.profileForm}
          >
            <input
              type="text"
              name="username"
              value={input.username}
              onChange={handleChange}
              placeholder="Nombre de usuario"
            ></input>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
              placeholder="Nombre"
            ></input>
            <input
              type="text"
              name="surname"
              value={input.surname}
              onChange={handleChange}
              placeholder="Apellido"
            ></input>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="ejemplo@prueba.com"
            ></input>
            <input
              type="text"
              name="billingAddress"
              value={input.billingAddress}
              onChange={handleChange}
              placeholder="Dirección"
            ></input>
            <input
              type="text"
              name="zipCode"
              value={input.zipCode}
              onChange={handleChange}
              placeholder="Código postal"
            ></input>
            <button type="submit">Guardar Información</button>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
