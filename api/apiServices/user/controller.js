const bcrypt = require("bcrypt");
const speakeasy = require('speakeasy')
const qrcode = require('qrcode');
var fs = require('fs');
const { User } = require("../../services/db/db.js");

const verify = require("../../scripts/2FA/verify2fa.js");

async function getAllUsers() {
  try {
    console.log("a");
    const allUsers = await User.findAll();
    return allUsers;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getQR(user_id) {
  //ACA GENERAMOS EL QR DEL USER QUE QUIERE ACTIVAR 2FA
  var secret = speakeasy.generateSecret({
    name: "TechBunny_TEST",
  });
  console.log(secret);
  const response = qrcode.toDataURL(secret.otpauth_url, function (err, data) {
    // RETORNA UNA IMAGEN QR PARA PONER EN ETIQUETA IMG COMO SRC <img src= ${response} />
    fs.writeFile("qr.html", `<img src="${data}"> </img>`, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });
  User.update({ secretAuth: secret.hex }, { where: { user_id } }); // GUARDAMOS EL SECRET DEL USER EN SU TABLA

  console.log("se genero el QR");

  return response; // RETORNAMOS EL QR PARA LA CONFIGURACION DEL 2FA
}

async function compareGoogleAuth(user_id, token) {
  // FUNCION QUE COMPARA CODIGO ENVIADO POR EL USER CON CODIGO DE GOOGLE AUTH -

  const response = await verify(user_id, token); // VERIFY NOS DEVUELVE SI EL TOKEN FUE CORRECTO Y SI EL USUARIO TIENE TOKEN EN FALSE (PARA CAMBIARLE SUS SETTINGS DE GOOGLEAUTH A TRUE)

  if (!response.googleAuth && response.verified)
    // VERIFICAMOS SI EL USER TIENE googleAuth ACTIVADO (TRUE O FALSE), SI ES FALSE, SE LO ACTIVAMOS
    User.update({ googleAuth: response.verified }, { where: { user_id } }); // GUARDAMOS EL SECRET DEL USER EN SU TABLA

  console.log("el resultado de la verificacion es: ", response.verified);
  return response.verified;
}

async function getUserById(user_id) {
  try {
    const userById = await User.findAll({
      where: { user_id },
    });
    return userById;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function deleteUser(user_id) {
  try {
    const { user_id} = body;
    const existe = await User.findOne({ where: { user_id }});
    if (existe) {
      const isTrue = await User.update({deleted:true},{
        where: { user_id },
      });
      if (isTrue) {
        await User.update({deleted:false},{
          where: { user_id },
        });
      }
      return "Usuario eliminado con exito!";
    } else {
      return "Usuario no encontrado!";
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function modifyUser(user_id, body) {
  //  los admins usan este controller
  try {
    body.password = await bcrypt.hash(body.password, 10); // 10 salt

    await User.update(body, { where: { user_id } });
    return "usuario  modificado exitosamente.";
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { getAllUsers , getUserById , modifyUser , deleteUser, getQR , compareGoogleAuth};
