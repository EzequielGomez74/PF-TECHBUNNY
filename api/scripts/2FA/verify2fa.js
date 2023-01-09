const speakeasy = require('speakeasy')
const { User } = require("../../services/db/db.js");


async function verify (user_id,token) {

const usuario = await User.findByPk(user_id)
const googleAuth = usuario.dataValues.googleAuthentication;


var verified = speakeasy.totp.verify({          // CHECKEA EN GOOGLE SI LA AUTH ES CORRECTA
    secret: usuario.dataValues.secretAuth    , // SECRET DEL USUARIO EN LA DB
    encoding: "hex",
    token: token,  // TOKEN INGRESADO POR EL USUARIO EN LA PETICION
}); 
    return {verified, googleAuth}
}

module.exports = verify;