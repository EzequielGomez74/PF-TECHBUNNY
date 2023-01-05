const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();
const validate = require("../../scripts/bodyValidators/index.js");
const { User } = require("../../services/db/db.js");
const verify = require("../../scripts/2FA/verify2fa.js");

router.get("/:user_id", async (req, res) => {
  try {
    res.status(200).json(await controller.getUserById(req.params.user_id));
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.get("/", async (req, res) => {
  try {
    res.status(200).json(await controller.getAllUsers());
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    res.status(200).json(await controller.getAllUsers());
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// $   /googleAuth/3   esto es para cuando el user quiere activar la 2FA
router.get("/googleAuth/:user_id", async (req, res) => {                     
  try {
    res.status(200).json(await controller.getQR(req.params.user_id));         // $ RETORNA UN STRING QUE SE INSERTA EN UNA ETIQUETA <IMG> PARA MOSTRAR EL QR DE ESE USUARIO
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// $ ACTIVA 
router.put("/googleAuth/:user_id", async (req, res) => {                                                        // ACA SE CAMBIA googleAuth A true EN LA TABLA DE USER  
  try {
    res
      .status(200)
      .json(
        await controller.compareGoogleAuth(req.params.user_id, req.body.token)
      ); // RETORNA VERIFIED TRUE O FALSE
  } catch (error) {
    res.status(400).send(error.message);
  }
})

 
// /users/3   body={surname:"beto",username:"pepe"}
router.put("/:user_id", validate.user, async (req, res) => {
  try {
    const data = req.body;
    const { user_id } = req.params;
    const usernameDb = await User.findByPk(user_id);
    if (
      usernameDb &&
      (usernameDb.username === req.username || req.role === 3) // permisos para modificar si es admin
    ) {
      res.status(200).send(await controller.modifyUser(user_id, data));
    } else {
      throw new Error(
        "el usuario que realizo la peticion no tiene permisos de admin o no es el propietario de la cuenta a modificar"
      );
    }
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


module.exports = router;
