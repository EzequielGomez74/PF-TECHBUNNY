const { Newsletter } = require("../../services/db/db.js");
const { sendMail } = require("../../services/mailer/emailer.js");

async function subscribe(email) {
  const existe = await Newsletter.findOne({ where: email });
  try {
    if (existe) return "ya estas subscripto";
    await Newsletter.create(email);
    const userdata = { email: email.email, type: "newsletter" };
    sendMail(userdata);
    return "Bienvenido al Newsletter!";
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getSubscribers() {
  try {
    let emails = [];
    const newsletterData = await Newsletter.findAll();
    newsletterData.map((el) => {
      emails.push(el.dataValues.email);
    });
    return emails;
  } catch (error) {
    throw new Error(error);
  }
}

async function unsubscribe(newsletter_id) {
  try {
    await Newsletter.destroy({ where: newsletter_id });
    return "Te desubscribiste!";
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  subscribe,
  unsubscribe,
  getSubscribers,
};
