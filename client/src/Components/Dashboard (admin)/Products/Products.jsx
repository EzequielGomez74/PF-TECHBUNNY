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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { Edit, Delete, Search } from "@mui/icons-material";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { FormLabel } from "@mui/material";

import {
  getProductsAdmin,
  postProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getSubcategoriesByCategory,
} from "../../../redux/actions";
import s from "./Products.module.css";

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

function Products() {
  //Sidebar
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const subcategoriesByCategory = useSelector(
    (state) => state.subcategoriesByCategory
  );

  const [productSelected, setProductSelected] = useState({
    name: "",
    price: 0,
    brand: "",
    stock: 0,
    image: "",
    subcategory: "",
    category: "",
  });

  const initialLoad = useRef(true);
  let subcategoryRef = useRef();

  useEffect(() => {
    if (initialLoad.current) {
      dispatch(getProductsAdmin());
      dispatch(getCategories());
      initialLoad.current = false;
    }
    setProductRows(products);
  }, [dispatch, products]);

  const peticionPost = async () => {
    dispatch(
      postProduct({
        ...productSelected,
        price: parseInt(productSelected.price),
        stock: parseInt(productSelected.stock),
      })
    );
    abrirCerrarModalInsertar();
  };

  const peticionPut = async () => {
    dispatch(
      updateProduct({
        ...productSelected,
        image: "https://www.uba.ar/internacionales/archivos/TEST.jpg",
      })
    );
    abrirCerrarModalEditar();
  };

  const peticionDelete = async () => {
    dispatch(deleteProduct(productSelected.product_id));
    abrirCerrarModalEliminar();
  };

  // Estilos predeterminados
  const styles = useStyles();
  //Modales
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const seleccionarConsola = (product, caso) => {
    setProductSelected(product);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "category") {
      // setProductSelected((prevState) => ({
      //   ...prevState,
      //   subcategory: "",
      // }));
      subcategoryRef.current.value = "josesito";
      dispatch(getSubcategoriesByCategory(value));
    }
  };

  function handleFileChange(event) {
    setProductSelected({ ...productSelected, image: event.target.files[0] });
  }

  const bodyInsertar = (
    <FormControl className={styles.modal}>
      <h3>Agregar Nuevo Producto</h3>
      <TextField
        name="name"
        className={styles.inputMaterial}
        label="Name"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="brand"
        className={styles.inputMaterial}
        label="Brand"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="price"
        className={styles.inputMaterial}
        label="Price"
        onChange={handleChange}
        type="number"
      />
      <br />
      <TextField
        name="stock"
        className={styles.inputMaterial}
        label="Stock"
        onChange={handleChange}
        type="number"
      />
      <br />
      <br />
      <span>Categoría</span>

      <Select
        name="category"
        className={styles.inputMaterial}
        onChange={handleChange}
        value={productSelected && productSelected.category}
      >
        {categories &&
          categories.map((cat) => {
            return <MenuItem value={cat.name}>{cat.name}</MenuItem>;
          })}
      </Select>
      <br />
      <br />
      <span>Subcategoría</span>
      <Select
        name="subcategory"
        className={styles.inputMaterial}
        label="Subcategory"
        onChange={handleChange}
        defaultValue=""
        ref={subcategoryRef}
      >
        {subcategoriesByCategory && subcategoriesByCategory.length ? (
          subcategoriesByCategory.map((subcat) => {
            return <MenuItem value={subcat.name}>{subcat.name}</MenuItem>;
          })
        ) : (
          <p>Debes seleccionar una categoria primero</p>
        )}
      </Select>
      <br />
      <br />
      <input name="image" type="file" onChange={handleFileChange} />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </FormControl>
  );

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Producto</h3>
      <TextField
        name="product_id"
        className={styles.inputMaterial}
        label="Id"
        onChange={handleChange}
        value={productSelected && productSelected.product_id}
      />
      <br />
      <TextField
        name="name"
        className={styles.inputMaterial}
        label="Name"
        onChange={handleChange}
        value={productSelected && productSelected.name}
      />
      <br />
      <TextField
        name="brand"
        className={styles.inputMaterial}
        label="Brand"
        onChange={handleChange}
        value={productSelected && productSelected.brand}
      />
      <br />
      <TextField
        name="price"
        className={styles.inputMaterial}
        label="Price"
        onChange={handleChange}
        value={productSelected && productSelected.price}
      />
      <br />
      <TextField
        name="stock"
        className={styles.inputMaterial}
        label="Stock"
        onChange={handleChange}
        value={productSelected && productSelected.stock}
      />
      <br />
      <TextField
        name="category"
        className={styles.inputMaterial}
        label="Category"
        onChange={handleChange}
        value={productSelected && productSelected.category}
      />
      <br />
      <TextField
        name="subcategory"
        className={styles.inputMaterial}
        label="Subcategory"
        onChange={handleChange}
        value={productSelected && productSelected.subcategory}
      />
      <br />
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
        <b>{productSelected && productSelected.name}</b> ?{" "}
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
  const [productRows, setProductRows] = useState(products);

  const requestSearch = (searchedVal) => {
    const filteredRows = products.filter((row) => {
      return row.name
        .toString()
        .toLowerCase()
        .includes(searchedVal.toString().toLowerCase());
    });
    if (searchedVal.length < 1) {
      setProductRows(products);
    } else {
      setProductRows(filteredRows);
    }
  };

  // Sort
  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("product_id");

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
    rowsPerPage -
    Math.min(rowsPerPage, productRows.length - page * rowsPerPage);

  //ACA EMPIEZA RENDER PRODUCTS

  return (
    <div>
      <div>
        <Toolbar openSidebar={toggleSidebar} />
        <Backdrop SideBar={sidebar} closeSidebar={toggleSidebar} />
        <Sidebar SideBar={sidebar} />
      </div>
      <div className={s.TableProductInfo}>
        <div className={s.outerItems}>
          <h2>Productos TECHBUNNY</h2>
          <Button onClick={abrirCerrarModalInsertar}>Insertar</Button>
        </div>
        <Paper className={s.paper}>
          <br />
          <TextField
            className={s.productsSearchbar}
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
                      active={valueToOrderBy === "product_id"}
                      direction={
                        valueToOrderBy === "product_id" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("product_id")}
                    >
                      Id de Producto
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
                      Nombre de Producto
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={valueToOrderBy === "brand"}
                      direction={
                        valueToOrderBy === "brand" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("brand")}
                    >
                      Marca
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={valueToOrderBy === "price"}
                      direction={
                        valueToOrderBy === "price" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("price")}
                    >
                      Precio
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={valueToOrderBy === "soldCount"}
                      direction={
                        valueToOrderBy === "soldCount" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("soldCount")}
                    >
                      Cantidad Vendida
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={valueToOrderBy === "stock"}
                      direction={
                        valueToOrderBy === "stock" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("stock")}
                    >
                      Stock
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={valueToOrderBy === "active"}
                      direction={
                        valueToOrderBy === "active" ? orderDirection : "asc"
                      }
                      onClick={createSortHandler("active")}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Editar</TableCell>
                  <TableCell>Eliminar</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {sortedRowInformation(
                  productRows,
                  getComparator(orderDirection, valueToOrderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => (
                    <TableRow key={product.product_id}>
                      <TableCell>{product.product_id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>US$ {product.price}</TableCell>
                      <TableCell>{product.soldCount}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        {product.active ? "Activo" : "Inactivo"}
                      </TableCell>
                      <TableCell>
                        <Edit
                          className={styles.iconos}
                          onClick={() => seleccionarConsola(product, "Editar")}
                        />
                      </TableCell>
                      <TableCell>
                        <Delete
                          className={styles.iconos}
                          onClick={() =>
                            seleccionarConsola(product, "Eliminar")
                          }
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
              count={productRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Paper>
        <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
        </Modal>

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

export default Products;
