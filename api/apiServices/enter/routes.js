const { Router } = require("express");
const controller = require("./controller.js");
const validate = require("../../scripts/bodyValidators/index.js");

const router = Router();
//NEW USER
router.post("/", async (req, res) => {
  const data = req.body;
  try {
    res.status(200).json({ status: await controller.handleNewUser(data) });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// PARAMS /enter/login   /enter/logout  /enter/recover
router.put("/:accessType", async (req, res) => {
  const { accessType } = req.params;
  try {
    switch (accessType) {
      case "login":
        const { username, password } = req.body;
        let authResult;
        if (req.body?.tokenId) {
          authResult = await controller.handleGoogleLogin(req.body);
        } else if (username && password) {
          authResult = await controller.handleLogin(req.body);
        } else if (req.accessToken) {
          authResult = await controller.handleLoginWithAccess(req.accessToken);
        } else {
          return res.sendStatus(202);
        }
        // ? manejo de respuesta
        if (authResult.accessToken) {
          res.status(200).json({
            accessToken: authResult.accessToken,
            user: authResult.user,
          });
        } else if (authResult === null || authResult.twoFactor) {
          return res.status(200).json(authResult);
        } else {
          res.status(200).json({ status: authResult });
        }
        break;
      case "logout":
        //! LOGOUT tiene que guardar data de la session - savedSessionData
        // const cookie = req.cookies?.jwt;
        // const savedSessionData = req.cookies?.savedSessionData;
        if (req.body?.user_id) {
          res.status(200).json({
            status: await controller.handleLogout(req.body.user_id),
          });
        } else res.sendStatus(400);
        break;
      case "recover":
        //Entra un body = {username:"Pepito"}
        if (req.body?.email) {
          res.status(200).json({
            status: await controller.handleRecoverPassword(req.body.email),
          });
        } else res.status(400).json({ status: "invalid username" });
      default:
        break;
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
