const { Router } = require("express");
const controller = require("./controller.js");

const router = Router();
//NEW USER
router.post("/", async (req, res) => {
  const { user, password } = req.body;
  try {
    res.status(200).json(await controller.handleNewUser(user, password));
  } catch (error) {
    res.status(error.message.statusCode).json(error.message.msg);
  }
});
//checkear diferentes tipos de query (newUser , logout , recoverPassword ,etc)
// /enter?type=logout   /enter?type=recover /enter?type=newUser
router.put("/", async (req, res) => {
  console.log(req.query);
  try {
    if (req.query.type) {
      switch (req.query.type) {
        case "recover":
          break;
        case "logout":
          const cookie = req.cookies?.jwt;
          if (cookie) {
            await controller.handleLogout(cookie);
            res.sendStatus(200);
          } else res.sendStatus(400);
          break;
        default:
          break;
      }
    } else {
      //login
      console.log("ASD");
      const { user, password } = req.body;
      if (user && password) {
        const { accessToken, refreshToken } = await controller.handleLogin(
          user,
          password
        );
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          maxAge: 5 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ accessToken });
      } else {
        res.sendStatus(400);
      }
    }
  } catch (error) {
    res.sendStatus(400);
  }
});
module.exports = router;
