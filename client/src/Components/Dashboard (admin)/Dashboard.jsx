import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Backdrop from '../Toolbar/Backdrop'
import Sidebar from '../Toolbar/Sidebar'
import Toolbar from '../Toolbar/Toolbar'
import { getProducts } from '../../redux/actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const [sidebar, setSidebar] = useState(false)

  const dispatch = useDispatch()
  const products = useSelector(state => state.products)

  const [addNewProduct, setAddNewProduct] = useState({
    product_id: '',
    name: '',
    price: '',
    soldCount: '',
    stock: '',
  })

  useEffect(()=>{
    dispatch(getProducts())
  },[dispatch])

  // const handleAddFormChange = (e) => {
  //   e.preventDefault();
  // }


  const toggleSidebar = () => {
    setSidebar((prevState)=> !prevState)
  }



  return (
    <div>
      <div>
        <Toolbar openSidebar={toggleSidebar} />
        <Backdrop SideBar={sidebar} closeSidebar={toggleSidebar} />
        <Sidebar SideBar={sidebar} />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Id de Producto</th>
              <th>Nombre de Producto</th>
              <th>Precio</th>
              <th>Cantidad Vendida</th>
              <th>Stock</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr>
                <td>{product.product_id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.soldCount}</td>
                <td>{product.stock}</td>
                <td><FontAwesomeIcon icon={faPenToSquare} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Agregar Producto</h2>
        <form>
          <input type="text" name='product_id' value={addNewProduct.product_id} required='required' placeholder='ID' />
          <input type="text" name='name' value={addNewProduct.name} required='required' placeholder='Nombre de Producto' />
          <input type="text" name='price' value={addNewProduct.price} required='required' placeholder='Precio' />
          <input type="text" name='soldCount' value={addNewProduct.soldCount} required='required' placeholder='Cantidad Vendida' />
          <input type="text" name='stock' value={addNewProduct.stock} required='required' placeholder='Stock' />
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  )
}

export default Dashboard