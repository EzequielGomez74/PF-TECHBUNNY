const { Cart, Product } = require("../../services/db/db.js");

async function getCart(user_id) {
  try {
    let carro = await Cart.findAll({ where: { user_id } });
    return carro;
  } catch (error) {
    throw new Error(error.message);
  }
}

// $ esta ruta suma un producto  al carrito del usuario
// $ Puede recibir solo un product_id pero este puede tener mas de una unidad {producto_id: 720 , count: x }   
async function addProduct(body, user_id) {
  try {
    const { product_id, price, count, product_name } = body;
    const existe = await Cart.findOne({ where: { product_id, user_id }});
    //TODO HACER VERIFICACION PARA QUE NO PUEDA TENER MAS EN EL CARRITO DE LOS QUE HAY EN STOCK.
    // const verifyStock = await Product.findByPk(cartUser.product_id) 
    // if(verifyStock.dataValues.stock === cartUser.count) throw new Error("no hay mas stock de este producto.")  
    if (!existe) {
      await Cart.create({user_id, product_id, price, count, product_name});
      return "Producto agregado a carrito!";
    } else {
      async function agregarProducto(product_id, price, count, product_name,user_id) {
        await Cart.upsert({
          user_id: user_id,
          product_id: product_id, 
          price: price, 
          product_name: product_name,
          count: count + existe.count,
        }, {where: {product_id: existe.product_id}});
      }
      agregarProducto(product_id, price, count, product_name,user_id);
      return "Productos de carrito actualizados!";
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

// $ esta funcion unicamente reduce o aumenta en 1u el producto del cart del usuario.
// $ Verifica si el stock del producto es igual a la cantidad que hay en el carrito no le deja sumar . 
// $ Verifica si la cantidad que tiene en el carrito es 1u no l odeja restar .
async function updateCount(user_id, body){
  try {
    const { product_id, action } = body
    const cartUser = await Cart.findOne({                                                                                              
			where: { 
        user_id: user_id,
        product_id: product_id,
       }
		}); 
    if(cartUser) {
      const verifyStock = await Product.findByPk(cartUser.product_id)
    if(action === "plus") {
      console.log(verifyStock.dataValues.stock)
      if(verifyStock.dataValues.stock === cartUser.count) throw new Error("no hay mas stock de este producto.")
      await cartUser.update({count: cartUser.count + 1}, {where: {product_id: body.product_id}}) 
    }
    if(action === "minus") {
      if(cartUser.count === 1) throw new Error("no se puede restar al producto si esta en 1.")
      await cartUser.update({count: cartUser.count - 1}, {where: {product_id: body.product_id}})}
    } else {
      throw new Error("no se encontró ese producto")
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

// ?                                                           DELETE CART

// $ esta funcion unicamente elimina productos o todo el cart del user_id.
// $ 
async function deleteCart(params, body){
  try {
    if (body.product_id){ 
      await Cart.destroy({where: {product_id: body.product_id}}) 
      return ("Se elimino el producto que solicitaste.") 
    } else {

      await Cart.destroy({where: {user_id: params.user_id}}) 
      return ("Se elimino el carrito completo.") 
    }
  } catch (error) {
    throw new Error(error.message);
  }
}




module.exports = {
  addProduct,
  getCart,
  updateCount,
  deleteCart
};
