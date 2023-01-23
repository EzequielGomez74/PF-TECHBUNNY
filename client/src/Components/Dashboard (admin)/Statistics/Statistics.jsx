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
      {trigger.current ? (
        <div className={s.statisticsContainer}>
          <div
            style={{
              width: "1600px",
              height: "900px",
              backgroundColor: "white",
            }}
          >
            <ResponsiveLineUsers data={allStatistics.usersData} />
          </div>
          <div
            style={{
              width: "1600px",
              height: "900px",
              backgroundColor: "white",
            }}
          >
            <ResponsivePieBrands data={allStatistics.brandsData} />
          </div>
          <div
            style={{
              width: "1600px",
              height: "900px",
              backgroundColor: "white",
            }}
          >
            <ResponsiveAreaBumpCategories data={allStatistics.categoriesData} />
          </div>
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default Statistics;
