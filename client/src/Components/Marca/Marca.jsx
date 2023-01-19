import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'
import { getProductsByBrand } from '../../redux/actions'
import CardV from '../Card V/CardV'

function Marca() {
    const dispatch = useDispatch()
    const { marca } = useParams()

    const perifericos = useSelector(state => state.productsByBrand)
    const user = useSelector((state) => state.loggedUser);

    const Razer = perifericos.filter(p => p.brand.includes('Razer'))
    const HyperX = perifericos.filter(p => p.brand.includes('HyperX'))
    const Logitech = perifericos.filter(p => p.brand.includes('Logitech'))
    const Redragon = perifericos.filter(p => p.brand.includes('Redragon'))
    const CoolerMaster = perifericos.filter(p => p.brand.includes('Cooler master'))
    const Nintendo = perifericos.filter(p => p.brand.includes('Nintendo'))

    //razer, hiperx, logitech, redDragon, coolerMaster, Nintendo
   useEffect(()=> {
        dispatch(getProductsByBrand())
   }, [dispatch])

  return (
    <div>
        <NavBar/>
        <section>
            {marca === 'Razer' ? Razer.map(e => <CardV
                favorite={e.favorite ? e.favorite : ""}
                user_id={user.user_id}
                key={e.product_id}
                product_id={e.product_id}
                brand={e.brand}
                name={e.name}
                image={e.image}
                price={e.price}
                category={e.category}
                subcategory={e.subcategory}
             />) : marca === 'HyperX' ? HyperX.map(e => <CardV
                favorite={e.favorite ? e.favorite : ""}
                user_id={user.user_id}
                key={e.product_id}
                product_id={e.product_id}
                brand={e.brand}
                name={e.name}
                image={e.image}
                price={e.price}
                category={e.category}
                subcategory={e.subcategory}
             />) : marca === 'Logitech' ? Logitech.map(e => <CardV
                favorite={e.favorite ? e.favorite : ""}
                user_id={user.user_id}
                key={e.product_id}
                product_id={e.product_id}
                brand={e.brand}
                name={e.name}
                image={e.image}
                price={e.price}
                category={e.category}
                subcategory={e.subcategory}
             />) : marca === 'Redragon' ? Redragon.map(e => <CardV
                favorite={e.favorite ? e.favorite : ""}
                user_id={user.user_id}
                key={e.product_id}
                product_id={e.product_id}
                brand={e.brand}
                name={e.name}
                image={e.image}
                price={e.price}
                category={e.category}
                subcategory={e.subcategory}
             />) : marca === 'CoolerMaster' ? CoolerMaster.map(e => <CardV
                favorite={e.favorite ? e.favorite : ""}
                user_id={user.user_id}
                key={e.product_id}
                product_id={e.product_id}
                brand={e.brand}
                name={e.name}
                image={e.image}
                price={e.price}
                category={e.category}
                subcategory={e.subcategory}
             />) : Nintendo.map(e => <CardV
                favorite={e.favorite ? e.favorite : ""}
                user_id={user.user_id}
                key={e.product_id}
                product_id={e.product_id}
                brand={e.brand}
                name={e.name}
                image={e.image}
                price={e.price}
                category={e.category}
                subcategory={e.subcategory}
             />) }
        </section>
        <Footer />
    </div>
  )
}

export default Marca