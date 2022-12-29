const { Router } = require("express");
const controller = require("./controller.js");

const router = Router();
//NEW USER
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    res.status(200).json(await controller.handleNewUser(username, password));
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
        if (username && password) {
          const { accessToken, refreshToken } = await controller.handleLogin(
            username,
            password
          );
          res.cookie("jwt", refreshToken, {
            sameSite: "None",
            secure: true,
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          res.status(200).json({ accessToken });
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
      default:
        break;
    }
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
