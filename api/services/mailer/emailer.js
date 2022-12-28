const nodemailer = require("nodemailer");
const { configmailtrap, configgmail } = require("../../config/mailerconfig");

const template = (data) => {
  // if(data.order_id)
  return {
    // from: '"🐰 TechBunny 🐰" <techbunnypf@gmail.com>', //  si es con la config de gmail  no hace falta el from:
    from: '"🐰 TechBunny 🐰" <info@techbunny.com>', // sender address
    to: `${data.email}`,
    subject: `Hola Bienvenido a TechBunny ✔`, // Subject line
    html: "<b>Gracias por registrate</b>", // html body
  };
};
const createTrans = () => {
const transport = nodemailer.createTransport(configmailtrap)
return transport;
}
const sendMail = async (data) => {
  const transporter = createTrans()
  const info = await transporter.sendMail(template(data));
  console.log("Message sent: %s", info.messageId);
  return 
}

module.exports = { sendMail , createTrans}
