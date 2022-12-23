const { Router } = require("express");
const controller = require("./controller.js");
const router = Router();

router.get("/:user_id", async (req, res) => {
  try {
    console.log("a")
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



router.put("/:user_id", async (req, res) => {
  const { username, name, surname, password, email, billingAddress, defaultShippingAddress, zipCode, role, isActive, needPasswordReset, profilePicture } = req.body
    let obj = {
      username , name, surname, password, email, billingAddress, defaultShippingAddress, zipCode, role, isActive, needPasswordReset, profilePicture
    }
  const { user_id} = req.params;
  try {
    res.status(200).send(await controller.editUser(user_id, obj))
  } catch (error) {
    throw new Error(error);
    
  }
})

module.exports = router;
