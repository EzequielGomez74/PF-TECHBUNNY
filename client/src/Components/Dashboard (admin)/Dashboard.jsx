import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useDispatch, useSelector } from "react-redux";
import Backdrop from '../Toolbar/Backdrop'
import Sidebar from '../Toolbar/Sidebar'
import Toolbar from '../Toolbar/Toolbar'
// import { getProducts } from '../../redux/actions'
// import { makeStyles } from '@material-ui/core/styles';
// import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
// import { Edit, Delete } from '@mui/icons-material';
// import TablePagination from "@material-ui/core/TablePagination";
// import Paper from "@material-ui/core/Paper";
// import TableSortLabel from '@material-ui/core/TableSortLabel';
// // import SearchBar from "material-ui-search-bar";
// import s from "./Dashboard.module.css"

function Dashboard() {
    //Sidebar
    const [sidebar, setSidebar] = useState(false)
    const toggleSidebar = () => {
      setSidebar((prevState)=> !prevState)
    }

  return(<div>
          <div>
            <Toolbar openSidebar={toggleSidebar} />
            <Backdrop SideBar={sidebar} closeSidebar={toggleSidebar} />
            <Sidebar SideBar={sidebar} />
          </div>
  </div>)
}

export default Dashboard