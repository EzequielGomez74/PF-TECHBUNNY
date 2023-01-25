import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ResponsiveLineUsers from "./ResponsiveLineUsers/ResponsiveLineUsers";
import ResponsivePieBrands from "./ResponsivePieBrands/ResponsivePieBrands";
import * as actions from "../../../redux/actions";
import s from "./Statistics.module.css";
import ResponsiveAreaBumpCategories from "./ResponsiveAreaBumpCategories/ResponsiveAreaBumpCategories";
import loginUser from "../../../scripts/loginUser";
import { useRef, useState } from "react";
import Backdrop from "../../Toolbar/Backdrop";
import Sidebar from "../../Toolbar/Sidebar";
import Toolbar from "../../Toolbar/Toolbar";
import loadingStat from "../../../images/loadingStat.gif";

const Statistics = () => {
  const dispatch = useDispatch();
  const allStatistics = useSelector((state) => state.allStatistics);
  const initialLoad = useRef(true);
  const trigger = useRef(false);
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  useEffect(() => {
    if (initialLoad.current) {
      dispatch(actions.getAllStatistics(() => (trigger.current = true)));
      initialLoad.current = false;
    }
  }, [dispatch]);

  return (
    <div>
      <div className={s.toolBarComponents}>
        <Toolbar openSidebar={toggleSidebar} />
        <Backdrop SideBar={sidebar} closeSidebar={toggleSidebar} />
        <Sidebar SideBar={sidebar} />
      </div>
      <section className={s.statSection}>
        {trigger.current ? (
          <div className={s.statisticsContainer}>
            <div
              className={s.stat}
              style={{
                width: "1300px",
                height: "600px",
                backgroundColor: "white",
              }}
            >
              <h3>Compras totales de clientes TECHBUNNY</h3>
              <ResponsiveLineUsers data={allStatistics.usersData} />
            </div>
            <br />
            <div
              className={s.stat}
              style={{
                width: "1300px",
                height: "600px",
                backgroundColor: "white",
              }}
            >
              <h3>Ingresos brutos por marcas</h3>
              <div
                className={s.stat}
                style={{
                  width: "1300px",
                  height: "600px",
                  backgroundColor: "white",
                }}
              ></div>
              <ResponsivePieBrands data={allStatistics.brandsData} />
            </div>
            <br />
            <div
              className={s.stat}
              style={{
                width: "1300px",
                height: "600px",
                backgroundColor: "white",
              }}
            >
              <h3>Ingresos acumulados por categorías en un año</h3>
              <ResponsiveAreaBumpCategories
                data={allStatistics.categoriesData}
              />
            </div>
          </div>
        ) : (
          <div className={s.loadingStat}>
            <img src={loadingStat} alt="" />
          </div>
        )}
      </section>
    </div>
  );
};

export default Statistics;
