const { Newsletter } = require("../../services/db/db.js");
const { sendMail } = require("../../services/mailer/emailer.js");


async function subscribe(email) {
     const existe = await Newsletter.findOne({where: email})
     try {
     if (existe) return "ya estas subscripto"
      await Newsletter.create(email);
      console.log("MAILLLL",email);
      const userdata = {email:email.email,type:"newsletter"}
      console.log("USERDATANEWS",userdata);
      sendMail(userdata)
      return "Bienvenido al Newsletter!";
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function unsubscribe(newsletter_id) {
    try {
      await Newsletter.destroy({ where:  newsletter_id  });
      return "Te desubscribiste!";
    } catch (error) {
      throw new Error(error);
    }
  }

  module.exports = {
    subscribe,
    unsubscribe,
  };
  