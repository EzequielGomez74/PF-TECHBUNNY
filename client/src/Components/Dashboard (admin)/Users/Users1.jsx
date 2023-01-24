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
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Edit, Delete } from "@mui/icons-material";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import TableSortLabel from "@material-ui/core/TableSortLabel";
// import SearchBar from "material-ui-search-bar";
import { getUsers, updateUser, deleteUser } from "../../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import s from "./Users.module.css";

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

function Users() {
  //Sidebar
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersDashboard);

  const [userSelected, setUserSelected] = useState({
    user_id: "",
    name: "",
    surname: "",
    username: "",
    email: "",
    role: "",
    isDeleted: false,
    isLogged: false,
  });

  let initialLoad = useRef(true);

  useEffect(() => {
    if (initialLoad.current) {
      dispatch(getUsers());
      initialLoad.current = false;
      return;
    }
  }, []);

  const peticionPut = async () => {
    dispatch(updateUser(userSelected.user_id, userSelected));
    abrirCerrarModalEditar();
  };

  const peticionDelete = async () => {
    dispatch(deleteUser(userSelected.user_id));
    abrirCerrarModalEliminar();
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

  const seleccionarConsola = (user, caso) => {
    setUserSelected(user);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Usuario</h3>

      <TextField
        name="name"
        className={styles.inputMaterial}
        label="Name"
        onChange={handleChange}
        value={userSelected && userSelected.name}
      />
      <br />
      <TextField
        name="surname"
        className={styles.inputMaterial}
        label="Surname"
        onChange={handleChange}
        value={userSelected && userSelected.surname}
      />
      <br />
      <TextField
        name="username"
        className={styles.inputMaterial}
        label="Username"
        onChange={handleChange}
        value={userSelected && userSelected.username}
      />
      <br />
      <TextField
        name="email"
        className={styles.inputMaterial}
        label="Email"
        onChange={handleChange}
        value={userSelected && userSelected.email}
      />
      <br />
      <TextField
        name="role"
        className={styles.inputMaterial}
        label="Role"
        onChange={handleChange}
        value={userSelected && userSelected.role}
      />
      <br />
      <br />
      <Select
        name="isDeleted"
        value={userSelected && userSelected.isDeleted}
        label="Status"
        onChange={handleChange}
      >
        <MenuItem value={false}>Sin Ban</MenuItem>
        <MenuItem value={true}>Baneado</MenuItem>
      </Select>
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

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>
        Estás seguro que deseas cambiar el 'status' de{" "}
        <b>{userSelected && userSelected.name}</b> ?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>
          Sí
        </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  );

  //Search Input
  // const [searchTerm, setSearchTerm] = useState()

  // Sort
  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("user_id");

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
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  return (
    <div>
      <div>
        <Toolbar openSidebar={toggleSidebar} />
        <Backdrop SideBar={sidebar} closeSidebar={toggleSidebar} />
        <Sidebar SideBar={sidebar} />
      </div>
      <div className={s.TableUsersInfo}>
        {/* <input
          type='text'
          placeholder='Buscar productos'
          className='search'
          onChange={e => setSearchTerm(e.target.value)}
        /> */}
        {/* { searchTerm ? 
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id de Producto</TableCell>
                  <TableCell>Nombre de Producto</TableCell>
                  <TableCell>Marca</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Cantidad Vendida</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Editar</TableCell>
                  <TableCell>Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .filter(p => p.name.toLowerCase().includes(searchTerm))
                  .map(product => (
                  <TableRow>
                    <TableCell>{product.product_id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.soldCount}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell><Edit className={styles.iconos} onClick={()=>seleccionarConsola(product, 'Editar')}/></TableCell>
                    <TableCell><Delete  className={styles.iconos} onClick={()=>seleccionarConsola(product, 'Eliminar')}/></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        : ''} */}
        <div className={s.outerItems}>
          <h2>Usuarios TECHBUNNY</h2>
        </div>
        <Paper className={s.paper}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
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
                      active={valueToOrderBy === "name"}
                      direction={
                        valueToOrderBy === "name" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("name")}
                    >
                      Nombre
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={valueToOrderBy === "surname"}
                      direction={
                        valueToOrderBy === "surname" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("surname")}
                    >
                      Apellido
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={valueToOrderBy === "username"}
                      direction={
                        valueToOrderBy === "username" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("username")}
                    >
                      Nombre de Usuario
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={valueToOrderBy === "email"}
                      direction={
                        valueToOrderBy === "email" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("email")}
                    >
                      Email
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={valueToOrderBy === "role"}
                      direction={
                        valueToOrderBy === "role" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("role")}
                    >
                      Rol
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={valueToOrderBy === "isDeleted"}
                      direction={
                        valueToOrderBy === "isDeleted" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("isDeleted")}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={valueToOrderBy === "isLogged"}
                      direction={
                        valueToOrderBy === "isLogged" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("isLogged")}
                    >
                      Loggeado
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Editar</TableCell>
                  <TableCell>Eliminar</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {sortedRowInformation(
                  users,
                  getComparator(orderDirection, valueToOrderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user.user_id}>
                      <TableCell>{user.user_id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.surname}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.role === 3 ? "Admin" : "Usuario"}
                      </TableCell>
                      <TableCell>
                        {user.isDeleted ? (
                          <FontAwesomeIcon className={s.banned} icon={faBan} />
                        ) : (
                          <FontAwesomeIcon
                            className={s.notbanned}
                            icon={faCheck}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {user.isLogged ? (
                          <FontAwesomeIcon
                            className={s.logged}
                            icon={faCircle}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className={s.notlogged}
                            icon={faCircle}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Edit
                          className={styles.iconos}
                          onClick={() => seleccionarConsola(user, "Editar")}
                        />
                      </TableCell>
                      <TableCell>
                        <Delete
                          className={styles.iconos}
                          onClick={() => seleccionarConsola(user, "Eliminar")}
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
              count={users.length}
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

        <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>
      </div>
    </div>
  );
}

export default Users;
