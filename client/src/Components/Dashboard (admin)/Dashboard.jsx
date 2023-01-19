import React, { useState } from "react";
import Backdrop from "../Toolbar/Backdrop";
import Sidebar from "../Toolbar/Sidebar";
import Toolbar from "../Toolbar/Toolbar";

function Dashboard() {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  return (
    <div>
      <Toolbar openSidebar={toggleSidebar} />
      <Backdrop SideBar={sidebar} closeSidebar={toggleSidebar} />
      <Sidebar SideBar={sidebar} />
    </div>
  );
}

export default Dashboard;
