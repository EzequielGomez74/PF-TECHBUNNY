const nodemailer = require("nodemailer");
const { configmailtrap, configgmail } = require("../../config/mailerconfig");
const { pedidotemplate } = require("./templates/pedidotemplate.js");
const { welcometemplate } = require("./templates/welcometemplate.js");
const { newslettertemplate } = require("./templates/newslettertemplate");

const template = (userdata) => {
  if (userdata.type === "newsletter") {
    return {
      // from: '"🐰 TechBunny 🐰" <techbunnypf@gmail.com>', //  si es con la config de gmail  no hace falta el from:
      from: '"🐰 TechBunny 🐰" <info@techbunny.com>', // sender address
      to: `${userdata.email}`,
      subject: `Gracias por suscribirte al newsletter ✔`, // Subject line
      html: newslettertemplate(userdata), // html body
    };
  }
  if (userdata.type === "register") {
    return {
      // from: '"🐰 TechBunny 🐰" <techbunnypf@gmail.com>', //  si es con la config de gmail  no hace falta el from:
      from: '"🐰 TechBunny 🐰" <info@techbunny.com>', // sender address
      to: `${userdata.email}`,
      subject: `Hola Bienvenido a TechBunny ✔`, // Subject line
      html: welcometemplate(userdata), // html body
    };
  }
  if (userdata.type === "order") {
    return {
      // from: '"🐰 TechBunny 🐰" <techbunnypf@gmail.com>', //  si es con la config de gmail  no hace falta el from:
      from: '"🐰 TechBunny 🐰" <info@techbunny.com>', // sender address
      to: `${userdata.email}`,
      subject: `Gracias por tu orden✔`, // Subject line
      html: pedidotemplate(userdata), // html body
    };
  }
};
const createTrans = () => {
  const transport = nodemailer.createTransport(configmailtrap); //configgmail
  return transport;
};
const sendMail = async (userdata) => {
  const transporter = createTrans();
  const info = await transporter.sendMail(template(userdata));
  console.log("Message sent: %s", info.messageId);
  return;
};

module.exports = { sendMail };
