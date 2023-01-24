import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "../../../Components/Toolbar/Backdrop";
import Sidebar from "../../../Components/Toolbar/Sidebar";
import Toolbar from "../../../Components/Toolbar/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Edit, Search } from "@mui/icons-material";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { getOrders, updateOrder } from "../../../redux/actions";
import s from "./Orders.module.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const sortedRowInformation = (rowArray, comparator) => {
  const stabilizedRowArray = rowArray.map((el, index) => [el, index]);
  stabilizedRowArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedRowArray.map((el) => el[0]);
};

//! ACA ARRANCA EL COMPONENTE

function Orders() {
  //Sidebar
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.allOrders);
  const initialLoad = useRef(true);

  useEffect(() => {
    if (initialLoad.current) {
      dispatch(getOrders());
      initialLoad.current = false;
    }
    setOrderRows(allOrders);
  }, [dispatch, allOrders]);

  const [orderSelected, setOrderSelected] = useState({
    order_id: "",
    status: "",
    user_id: "",
    total: "",
  });

  const peticionPut = async () => {
    dispatch(updateOrder(orderSelected.order_id, orderSelected));
    abrirCerrarModalEditar();
  };

  // Estilos predeterminados
  const styles = useStyles();
  //Modales
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const seleccionarConsola = (order, caso) => {
    setOrderSelected(order);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Order</h3>
      <TextField
        name="order_id"
        className={styles.inputMaterial}
        label="Id de Pedido"
        onChange={handleChange}
        value={orderSelected && orderSelected.order_id}
      />
      <br />
      <Select
        name="status"
        value={orderSelected && orderSelected.status}
        label="Status"
        onChange={handleChange}
      >
        <MenuItem value={"processed"}>Procesado</MenuItem>
        <MenuItem value={"canceled"}>Cancelado</MenuItem>
        <MenuItem value={"completed"}>Completado</MenuItem>
      </Select>
      <br />
      <TextField
        name="user_id"
        className={styles.inputMaterial}
        label="Id de Usuario"
        onChange={handleChange}
        value={orderSelected && orderSelected.user_id}
      />
      <br />
      <TextField
        name="total"
        className={styles.inputMaterial}
        label="Total"
        onChange={handleChange}
        value={orderSelected && orderSelected.total}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>
          Editar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );

  //Search Input
  const [orderRows, setOrderRows] = useState([]);

  const requestSearch = (searchedVal) => {
    const filteredRows = allOrders.filter((row) => {
      return row.order_id
        .toString()
        .toLowerCase()
        .includes(searchedVal.toString().toLowerCase());
    });
    if (searchedVal.length < 1) {
      setOrderRows(allOrders);
    } else {
      setOrderRows(filteredRows);
    }
  };

  // Sort
  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("order_id");

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  //Paginación de Tabla
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, orderRows.length - page * rowsPerPage);

  return (
    <div>
      <div>
        <Toolbar openSidebar={toggleSidebar} />
        <Backdrop SideBar={sidebar} closeSidebar={toggleSidebar} />
        <Sidebar SideBar={sidebar} />
      </div>
      <div className={s.TableOrdersInfo}>
        <div className={s.outerItems}>
          <h2>Pedidos TECHBUNNY</h2>
        </div>
        <Paper className={s.paper}>
          <br />
          <TextField
            className={s.ordersSearchbar}
            onChange={(e) => requestSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <br />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={valueToOrderBy === "order_id"}
                      direction={
                        valueToOrderBy === "order_id" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("order_id")}
                    >
                      Id de Pedido
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={valueToOrderBy === "status"}
                      direction={
                        valueToOrderBy === "status" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("status")}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={valueToOrderBy === "user_id"}
                      direction={
                        valueToOrderBy === "user_id" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("user_id")}
                    >
                      Id de Usuario
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={valueToOrderBy === "total"}
                      direction={
                        valueToOrderBy === "total" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("total")}
                    >
                      Total
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Editar</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {sortedRowInformation(
                  orderRows,
                  getComparator(orderDirection, valueToOrderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <TableRow key={order.order_id}>
                      <TableCell>{order.order_id}</TableCell>
                      <TableCell>
                        {order.status === "processed"
                          ? "Procesado"
                          : order.status === "completed"
                          ? "Completado"
                          : "Cancelado"}
                      </TableCell>
                      <TableCell>{order.user_id}</TableCell>
                      <TableCell>US$ {order.total}</TableCell>
                      <TableCell>
                        <Edit
                          className={styles.iconos}
                          onClick={() => seleccionarConsola(order, "Editar")}
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={orderRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Paper>

        <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
          {bodyEditar}
        </Modal>
      </div>
    </div>
  );
}

export default Orders;
