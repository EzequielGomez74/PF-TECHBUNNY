const { Newsletter } = require("../../services/db/db.js");

async function subscribe(email) {
     const existe = await Newsletter.findOne({where: email})
     try {
     if (existe) return "ya estas subscripto"
      await Newsletter.create(email);
      return "Bienvenido al Newsletter!";
    } catch (error) {
      throw new Error(error);
    }
  }

  async function unsubscribe(newsletter_id) {
    try {
      await Newsletter.update({subscribed:false},{ where:  newsletter_id  });
      return "Te desubscribiste!";
    } catch (error) {
      throw new Error(error);
    }
  }

  module.exports = {
    subscribe,
    unsubscribe,
  };
  