const bcrypt = require("bcryptjs");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
var fs = require("fs");
const { User } = require("../../services/db/db.js");

const verify = require("../../scripts/2FA/verify2fa.js");

async function getAllUsers() {
  try {
    const allUsers = await User.findAll();
    return allUsers;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUserBy(condition) {
  try {
    const user = await User.findOne({ where: condition });
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

async function getQR(user_id) {
  //ACA GENERAMOS EL QR DEL USER QUE QUIERE ACTIVAR 2FA
  var secret = speakeasy.generateSecret({
    name: "TechBunny_TEST",
  });
  const response = qrcode.toDataURL(secret.otpauth_url, function (err, data) {
    // RETORNA UNA IMAGEN QR PARA PONER EN ETIQUETA IMG COMO SRC <img src= ${response} />
    fs.writeFile("qr.html", `<img src="${data}"> </img>`, function (err) {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  });
  User.update({ secretAuth: secret.hex }, { where: { user_id } }); // GUARDAMOS EL SECRET DEL USER EN SU TABLA

  return response; // RETORNAMOS EL QR PARA LA CONFIGURACION DEL 2FA
}

async function compareGoogleAuth(user_id, token) {
  // FUNCION QUE COMPARA CODIGO ENVIADO POR EL USER CON CODIGO DE GOOGLE AUTH -

  const response = await verify(user_id, token); // VERIFY NOS DEVUELVE SI EL TOKEN FUE CORRECTO Y SI EL USUARIO TIENE TOKEN EN FALSE (PARA CAMBIARLE SUS SETTINGS DE GOOGLEAUTH A TRUE)

  if (!response.googleAuth && response.verified)
    // VERIFICAMOS SI EL USER TIENE googleAuth ACTIVADO (TRUE O FALSE), SI ES FALSE, SE LO ACTIVAMOS
    User.update({ googleAuth: response.verified }, { where: { user_id } }); // GUARDAMOS EL SECRET DEL USER EN SU TABLA
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
    const userFound = await User.findOne({ where: { user_id } });
    if (userFound.isDeleted === false) {
      await User.update(
        { isDeleted: true },
        {
          where: {
            user_id,
          },
        }
      );

      return "Usuario habilitado con exito!";
    } if(userFound.isDeleted === true) {
      await User.update(
        { isDeleted: false },
        {
          where: {
            user_id,
          },
        }
      );
    }
    
    return "Producto deshabilitado con exito!";
  } catch (error) {
    throw new Error(error.message);
  }
}

async function modifyUser(user_id, body) {
  //  los admins usan este controller
  try {
    //body.password = await bcrypt.hash(body.password, 10); // 10 salt
    const userFound = await User.update(body, { where: { user_id } });
    console.log("userFound ", userFound);
    return setLoggedUserData(userFound.dataValues);
  } catch (error) {
    throw new Error(error.message);
  }
}

function setLoggedUserData({
  user_id,
  username,
  name,
  surname,
  billingAddress,
  profilePicture,
  zipCode,
  email,
}) {
  return {
    user_id,
    username,
    name,
    surname,
    billingAddress,
    profilePicture,
    zipCode,
    email,
  };
}
module.exports = {
  getAllUsers,
  getUserById,
  modifyUser,
  deleteUser,
  getQR,
  compareGoogleAuth,
  getUserBy,
  setLoggedUserData,
};
