
const { configmailtrap, configgmail } = require("../../config/mailerconfig"); //$ configuracion para envio de mails con GMAIL o con MAILTRAP //
const { pedidotemplate } = require("./templates/pedidotemplate.js");
const { welcometemplate } = require("./templates/welcometemplate.js");
const { newslettertemplate } = require("./templates/newslettertemplate");

const template = (userdata) => {
  if (userdata.type === "newsletter") {
    return {
      from: '"🐰 TechBunny 🐰" <info@techbunny.com>', // sender address
      to: `${userdata.email}`,
      subject: `Gracias por suscribirte al newsletter ✔`, // Subject line
      html: newslettertemplate(userdata), //*
    };
  }
  if (userdata.type === "register") {
    return {
      from: '"🐰 TechBunny 🐰" <info@techbunny.com>', // sender address
      to: `${userdata.email}`,
      subject: `Hola Bienvenido a TechBunny ✔`, // Subject line
      html: welcometemplate(userdata), //*
    };
  }
  if (userdata.type === "order") {
    return {
      from: '"🐰 TechBunny 🐰" <info@techbunny.com>', // sender address
      to: `${userdata.email}`,
      subject: `Gracias por tu orden✔`, // Subject line
      html: pedidotemplate(userdata), //*
    };
  }
};
const createTrans = () => {
  //$  si rempalazamos con: configgmail los emails salen desde techbunnypf@gmail.com y sino con: configmailtrap es para verlas con mailtrap
  const transport = nodemailer.createTransport(configmailtrap); //$
  return transport;
};
const sendMail = async (userdata) => {
  const transporter = createTrans();
  const info = await transporter.sendMail(template(userdata));
  console.log("Message sent: %s", info.messageId);
  return;
};

module.exports = { sendMail };