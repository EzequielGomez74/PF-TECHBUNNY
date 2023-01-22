import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ResponsiveLineUsers from "./ResponsiveLineUsers/ResponsiveLineUsers";
import ResponsivePieBrands from "./ResponsivePieBrands/ResponsivePieBrands";
import * as actions from "../../../redux/actions";
import ResponsiveAreaBumpCategories from "./ResponsiveAreaBumpCategories/ResponsiveAreaBumpCategories";
const Statistics = () => {
  const dispatch = useDispatch();
  const allStatistics = useSelector((state) => state.allStatistics);
  useEffect(() => {
    dispatch(actions.getAllStatistics());
  }, [dispatch]);

  return (
    <div>
      <div
        style={{ width: "1600px", height: "900px", backgroundColor: "white" }}
      >
        <ResponsiveLineUsers data={allStatistics.usersData} />
      </div>
      <div
        style={{ width: "1600px", height: "900px", backgroundColor: "white" }}
      >
        <ResponsivePieBrands data={allStatistics.brandsData} />
      </div>
      <div
        style={{ width: "1600px", height: "900px", backgroundColor: "white" }}
      >
        <ResponsiveAreaBumpCategories data={allStatistics.categoriesData} />
      </div>
    </div>
  );
};

export default Statistics;
