const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();
const userValidator = require("../validators/user");
const { User } = require("../../services/db/db.js");

router.get("/:user_id", async (req, res) => {
  try {
    if (req.params.user_id)
      res.status(200).json(await controller.getUserById(req.params.user_id));
    else res.status(200).json(await controller.getAllUsers());
  } catch (error) {
    res.sendStatus(400);
  }
});
// /users/3   body={surname:"beto",username:"pepe"}
router.put("/:user_id", userValidator, async (req, res) => {
  try {
    const data = req.body;
    const { user_id } = req.params;
    const usernameDb = await User.findByPk(user_id);
    if (
      usernameDb &&
      (usernameDb.username === req.username || req.role === 3)
    ) {
      res.status(200).send(await controller.modifyUser(user_id, data));
    } else {
      throw new Error("fallo x");
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
