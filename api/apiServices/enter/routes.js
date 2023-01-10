const { Router } = require("express");
const controller = require("./controller.js");
const validate = require("../../scripts/bodyValidators/index.js");

const router = Router();
//NEW USER
router.post("/", async (req, res) => {
  const data = req.body;
  try {
    res.status(200).json(await controller.handleNewUser(data));
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// PARAMS /enter/login   /enter/logout  /enter/recover
router.put("/:accessType", async (req, res) => {
  console.log("enter-login");
  const { accessType } = req.params;
  try {
    switch (accessType) {
      case "login":
        const { username, password } = req.body;
        let authResult;
        if (req.body?.tokenId) {
          //todo login with google
          console.log("entro con google");
          authResult = await controller.handleGoogleLogin(req.body);
        } else if (username && password) {
          console.log("r body ", req.body);
          authResult = await controller.handleLogin(req.body);
          console.log("r authResult ", authResult);
        } else if (
          Object.keys(req.body).length === 0 &&
          req.username !== null
        ) {
          const refreshToken = req.cookies?.jwt;
          authResult = await controller.handleLoginWithRefresh(refreshToken);
        } else if (req.username === null) {
          return res.sendStatus(202);
        }
        // ? manejo de respuesta
        if (authResult.refreshToken) {
          console.log("GOOGLE ", authResult);
          res.cookie("jwt", authResult.refreshToken, {
            sameSite: "None",
            secure: true,
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.status(200).json({
            accessToken: authResult.accessToken,
            user: authResult.user,
          });
        } else if (authResult === null || authResult.twoFactor) {
          return res.status(200).json(authResult);
        } else {
          res.sendStatus(400);
        }
        break;
      case "logout":
        //! LOGOUT tiene que guardar data de la session - savedSessionData
        const cookie = req.cookies?.jwt;
        const savedSessionData = req.cookies?.savedSessionData;
        if (cookie) {
          await controller.handleLogout(cookie);
          res.status(200).json({ status: "SUCCESS" });
        } else res.sendStatus(400);
        break;
      case "recover":
        //Entra un body = {username:"Pepito"}
        if (req.body?.username) {
          res.status(200).json({
            status: await controller.handleRecoverPassword(req.body.username),
          });
        } else res.status(400).json({ status: "invalid username" });
      default:
        break;
    }
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
