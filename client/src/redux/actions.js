import { GET_ALL_PRODUCTS,  } from './actionTypes'

export const getProducts = () => {
    return function(dispatch){
        return fetch ('http://localhost:3001/products')
        .then(resp => resp.json())
        .then(data => dispatch({type: GET_ALL_PRODUCTS, payload: data}))
        .catch(error => console.log(error))
    }
}

// export const productsByCategory = (products) => {
//     return function(dispatch){
//         const a = products.filter(p => p.category === 'Equipos armados')
//         const b = products.filter(p => p.category === 'Consolas')
//         const c = products.filter(p => p.category === 'Notebooks')
//         const d = products.filter(p => p.category === 'Gabinetes')
//         const e = products.filter(p => p.category === 'Fuentes y UPS')
//         const f = products.filter(p => p.category === 'Motherboards')
//         const g = products.filter(p => p.category === 'Procesadores')
//         const h = products.filter(p => p.category === 'Cooling')
//         const i = products.filter(p => p.category === 'Memorias')
//         const j = products.filter(p => p.category === 'Almacenamiento')
//         const k = products.filter(p => p.category === 'Tarjetas de video')
//         const l = products.filter(p => p.category === 'Monitores y TV')
//         const m = products.filter(p => p.category === 'Sillas')
//         const n = products.filter(p => p.category === 'Pendrives')
//         const o = products.filter(p => p.category === 'Impresoras')
        
//         const filtered ={
//             equiposArmados: a,
//             consolas: b,
//             notebooks: c,
//             gabinetes:d,
//             fuentesYups:e,
//             motherboards: f,
//             procesadores: g,
//             cooling: h,
//             memorias:i,
//             almacenamiento:j,
//             tarjetasDeVideo: k,
//             monitoresY
//         }
//     }
// }
