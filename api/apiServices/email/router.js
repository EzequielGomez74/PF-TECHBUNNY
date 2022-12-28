const { Router } = require("express");
const controller = require("./controller.js");


const router = Router();
router.post("/", async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();
    const email = { ...req.body };
    try {
      res.status(200).send(await controller.sendEmail(review));
    } catch (error) {
      res.status(400).send(error);
    }
  });


