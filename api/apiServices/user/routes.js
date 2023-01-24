const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();
const validate = require("../../scripts/bodyValidators/index.js");
const verifyJWT = require("../../middlewares/verifyJWT");
const getUser = require("../../scripts/getUser");
router.use(verifyJWT); // !validacion de JWT
//!     ----- ACCESO USER  -----
//router.use(requiredAccess(2));
router.get("/:user_id", async (req, res) => {
  try {
    res.status(200).json(await controller.getUserById(req.params.user_id));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/", async (req, res, next) => {
  try {
    if (Object.keys(req.query).length === 0) {
      return next();
    }
    res.status(200).json(await controller.getUserBy(req.query));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/googleAuth/:user_id", async (req, res) => {
  // ESTO ES CUANDO EL USER QUIERE ACTIVAR LA 2FA EN SU CUENTA
  try {
    res.status(200).json(await controller.getQR(req.params.user_id)); // RETORNA UN QR PARA ESE USUARIO
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/googleAuth/:user_id", async (req, res) => {
  // ACA SE CAMBIA googleAuth A true EN LA TABLA DE USER
  try {
    res
      .status(200)
      .json(
        await controller.compareGoogleAuth(req.params.user_id, req.body.token)
      ); // RETORNA VERIFIED TRUE O FALSE
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// /users/3   body={surname:"beto",username:"pepe"}
//validate.user
//TODO CHECKEAR LA VALIDACION DE USER (DESACTIVADA POR EL MOMENTO)
router.put("/:user_id", async (req, res) => {
  try {
    const data = req.body;
    const { user_id } = req.params;
    const foundUser = await getUser({ user_id });
    if (
      foundUser &&
      (foundUser.username === req.username || req.role === 3) // permisos para modificar si es admin
    ) {
      res
        .status(200)
        .send({ status: await controller.modifyUser(user_id, data) });
    } else {
      throw new Error(
        "el usuario que realizo la peticion no tiene permisos de admin o no es el propietario de la cuenta a modificar"
      );
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//!     ----- ACCESO ADMIN  -----
//router.use(requiredAccess(3));
router.get("/", async (req, res) => {
  try {
    res.status(200).json(await controller.getAllUsers());
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:user_id", async (req, res) => {
  try {
    if (req.params.user_id)
      res.status(200).json(await controller.deleteUser(req.params.user_id));
  } catch (error) {
    res.sendStatus(400);
  }
});

// router.put("/:user_id", async (req, res) => {
//   const { username, name, surname, password, email, billingAddress, defaultShippingAddress, zipCode, role, isActive, needPasswordReset, profilePicture } = req.body
//   const { user_id } = req.params;
//   const { userRole } = req.role;
//   const { userDb } = req.username

//   try {
//     if ( user_id === userDb) { // ES USER
//       let obj = { name, surname, password, email, billingAddress, defaultShippingAddress, zipCode, profilePicture }
//       res.status(200).send(await controller.editByUser(user_id, obj))
//     }

//     if (userRole === 3) { // ES ADMIN
//       let obj = { username , name, surname, password, email, billingAddress, defaultShippingAddress, zipCode, role, isActive, needPasswordReset, profilePicture }
//       res.status(200).send(await controller.editByAdmin(user_id, obj))
//     }

//   } catch (error) {
//     throw new Error(error);

//   }
// })

module.exports = router;
