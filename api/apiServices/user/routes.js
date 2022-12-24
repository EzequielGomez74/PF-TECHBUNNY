const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();
const { validateCreate } = require("../validators/users");
const { User } = require("../../services/db/db.js");
const { log } = require("console");

router.get("/:user_id", async (req, res) => {
	try {
		console.log("a");
		if (req.params.user_id)
			res.status(200).json(await controller.getUserById(category));
		else res.status(200).json(await controller.getAllUsers());
	} catch (error) {
		res.sendStatus(400);
	}
});

// user_id: {
// username: {
// name: {
// surname: {
// password: {
// email:
// billingAddress: {
// defaultShippingAddress:
// zipCode:
// role:
// isActive:
// needPasswordReset:
// profilePicture:

router.put("/:user_id", validateCreate, async (req, res) => {
	try {
		const data = req.body;
		const { user_id } = req.params;
		const usernameDb = await User.findByPk(user_id);

		if (usernameDb && usernameDb.username === req.username  || req.role === 3) {
					res.status(200).send(await controller.edit(user_id, data));
          throw new Error("se modificó")

				} else {
      throw new Error("fallo x")
    }
	} catch (error) {
    console.log(error.message);

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
