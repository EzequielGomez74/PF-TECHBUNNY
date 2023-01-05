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
        if (username && password) {
          authResult = await controller.handleLogin(req.body);
        } else if (
          Object.keys(req.body).length === 0 &&
          req.username !== null
        ) {
          authResult = await controller.handleLogin({
            username: req.username,
            password: "pepito",
            token: req.body.token,
          });
        }
        console.log("auth ", authResult);
        if (authResult.refreshToken) {
          res.cookie("jwt", authResult.refreshToken, {
            sameSite: "None",
            secure: true,
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          return res
            .status(200)
            .json({
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
        const cookie = req.cookies?.jwt;
        if (cookie) {
          await controller.handleLogout(cookie);
          res.sendStatus(200);
        } else res.sendStatus(400);
        break;
      case "recover":
      //enviar mail de recover
      default:
        break;
    }
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
