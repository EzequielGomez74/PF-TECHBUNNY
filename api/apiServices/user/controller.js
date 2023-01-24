const bcrypt = require("bcryptjs");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
var fs = require("fs");
const { User } = require("../../services/db/db.js");

const verify = require("../../scripts/2FA/verify2fa.js");

async function getAllUsers() {
  try {
    let allUsers = await User.findAll();
    const userData = allUsers.map((u) => {
      let obj = {
        user_id: u.user_id,
        username: u.username,
        name: u.name,
        surname: u.surname,
        email: u.email,
        billingAddress: u.billingAddress,
        zipCode: u.zipCode,
        role: u.role,
        isActive: u.isActive,
        isDeleted: u.isDeleted,
        createdAt: u.createdAt,
      };

      if (u.accessToken) {
        obj = {
          ...obj,
          isLogged: true,
        };
      }
      return obj;
    });

    return userData;
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
        { isDeleted: true, accessToken: null },
        {
          where: {
            user_id,
          },
        }
      );

      return "Usuario habilitado con exito!";
    }
    if (userFound.isDeleted === true) {
      await User.update(
        { isDeleted: false },
        {
          where: {
            user_id,
          },
        }
      );
    }

    return "Usuario deshabilitado con exito!";
  } catch (error) {
    throw new Error(error.message);
  }
}

async function modifyUser(user_id, body) {
  //  los admins usan este controller
  try {
    await User.update(body, { where: { user_id } });
    return "SUCCESS";
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
  role,
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
    role,
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
