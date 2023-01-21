import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "../Toolbar/Backdrop";
import Sidebar from "../Toolbar/Sidebar";
import Toolbar from "../Toolbar/Toolbar";
import { getProducts } from "../../redux/actions";
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
} from "@material-ui/core";
import { Edit, Delete } from "@mui/icons-material";
import TablePagination from "@material-ui/core/TablePagination";
import { postProduct, updateProduct } from "../../redux/actions";
import ResponsiveLine1 from "./ResponsiveLine/ResponsiveLine1";

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

function Dashboard() {
  //Sidebar
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [productSelected, setProductSelected] = useState({
    product_id: "",
    name: "",
    price: "",
    brand: "",
    stock: "",
    image: "https://www.uba.ar/internacionales/archivos/TEST.jpg",
    subcategory: "",
    category: "",
  });

  //Peticiones --> actualizar en las actions

  // const peticionGet=async()=>{
  //   await axios.get(baseUrl)
  //   .then(response=>{
  //     setData(response.data);
  //   })
  // }

  const peticionPost = async () => {
    dispatch(
      postProduct({ ...productSelected, product_id: products.length + 1 })
    );
    abrirCerrarModalInsertar();
    // await axios.post(baseUrl, consolaSeleccionada)
    // .then(response=>{
    //   setData(data.concat(response.data))
    //   abrirCerrarModalInsertar()
    // })
  };

  const peticionPut = async () => {
    dispatch(
      updateProduct({
        ...productSelected,
        image: "https://www.uba.ar/internacionales/archivos/TEST.jpg",
      })
    );
    abrirCerrarModalEditar();
    // await axios.put(baseUrl+consolaSeleccionada.id, consolaSeleccionada)
    // .then(response=>{
    //   var dataNueva=data;
    //   dataNueva.map(consola=>{
    //     if(consolaSeleccionada.id===consola.id){
    //       consola.nombre=consolaSeleccionada.nombre;
    //       consola.lanzamiento=consolaSeleccionada.lanzamiento;
    //       consola.empresa=consolaSeleccionada.empresa;
    //       consola.unidades_vendidas=consolaSeleccionada.unidades_vendidas;
    //     }
    //   })
    //   setData(dataNueva);
    //   abrirCerrarModalEditar();
    // })
  };

  const peticionDelete = async () => {
    // await axios.delete(baseUrl+consolaSeleccionada.id)
    // .then(response=>{
    //   setData(data.filter(consola=>consola.id!==consolaSeleccionada.id));
    //   abrirCerrarModalEliminar();
    // })
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
  };

  const bodyInsertar = (
    <div className={styles.modal}>
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
      />
      <br />
      <TextField
        name="stock"
        className={styles.inputMaterial}
        label="Stock"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="category"
        className={styles.inputMaterial}
        label="Category"
        onChange={handleChange}
      />
      <br />
      <TextField
        name="subcategory"
        className={styles.inputMaterial}
        label="Subcategory"
        onChange={handleChange}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
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
        Estás seguro que deseas eliminar la consola{" "}
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

  // useEffect(async()=>{
  //   await peticionGet();
  // },[])

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  //Search Input
  const [searchTerm, setSearchTerm] = useState();

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
    rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  return (
    <div>
      <div>
        <Toolbar openSidebar={toggleSidebar} />
        <Backdrop SideBar={sidebar} closeSidebar={toggleSidebar} />
        <Sidebar SideBar={sidebar} />
      </div>
      <div>
        <input
          type="text"
          placeholder="Buscar productos"
          className="search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <br />
        <Button onClick={abrirCerrarModalInsertar}>Insertar</Button>
        <br />
        <br />

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

        <br />
        <br />
        <h2>Productos TECHBUNNY</h2>
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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                // .filter(f => {
                //   return searchTerm.toLowerCase() === '' ? f : f.name.toLowerCase().includes(searchTerm)
                // })
                .map((product) => (
                  <TableRow>
                    <TableCell>{product.product_id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.soldCount}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Edit
                        className={styles.iconos}
                        onClick={() => seleccionarConsola(product, "Editar")}
                      />
                    </TableCell>
                    <TableCell>
                      <Delete
                        className={styles.iconos}
                        onClick={() => seleccionarConsola(product, "Eliminar")}
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
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>

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
      <div>
        <ResponsiveLine1 />
      </div>
    </div>
  );
}

export default Dashboard;
