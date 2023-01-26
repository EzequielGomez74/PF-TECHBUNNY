const nodemailer = require("nodemailer");
require("dotenv").config();
const { configmailtrap, configgmail } = require("../../config/mailerconfig"); //$ configuracion para envio de mails con GMAIL o con MAILTRAP //
const { pedidotemplate } = require("./templates/pedidotemplate");
const { welcometemplate } = require("./templates/welcometemplate.js");
const { newslettertemplate } = require("./templates/newslettertemplate");
const { recoverTemplate } = require("./templates/recoverTemplate");
var fs = require("fs");

const template = async (userdata) => {
  let path = "http://localhost:3000";
  if (process.env.NODE_ENV === "production") {
    path = "https://pf-techbunny-lake.vercel.app";
  }

  if (userdata.type === "newsletter") {
    return {
      from: '"🐰 TechBunny 🐰" <info@techbunny.com>', // sender address
      to: `${userdata.email}`,
      subject: `Gracias por suscribirte al newsletter ✔`, // Subject line
      html: newslettertemplate(
        `${path}/newsletter/${userdata.verificationCode}`
      ), //*
    };
  }
  if (userdata.type === "register") {
    completePath = `${path}/verify/${userdata.verificationCode}`;
    return {
      from: '"🐰 TechBunny 🐰" <info@techbunny.com>', // sender address
      to: `${userdata.email}`,
      subject: `Hola Bienvenido a TechBunny ✔`, // Subject line
      html: welcometemplate(completePath, userdata), //*
    };
  }
  if (userdata.type === "order") {
    console.log("EMAILLL", userdata.email);
    return {
      from: "🐰 TechBunny 🐰", // sender address
      to: `${userdata.email}`,
      subject: `Gracias por tu orden✔`, // Subject line
      html: await pedidotemplate(userdata), //*
    };
  }
  if (userdata.type === "recover") {
    completePath = `${path}/NewPassword/${userdata.verificationCode}`;
    return {
      from: "🐰 TechBunny 🐰", // sender address
      to: `${userdata.email}`,
      subject: `Recovery Password❌`, // Subject line
      html: recoverTemplate(completePath), //*
    };
  }
};
const createTrans = () => {
  //$  si rempalazamos con: configgmail los emails salen desde techbunnypf@gmail.com y sino con: configmailtrap es para verlas con mailtrap
  const transport = nodemailer.createTransport(configgmail); //$
  return transport;
};
const sendMail = async (userdata) => {
  const transporter = await createTrans();
  const info = await transporter.sendMail(await template(userdata));
  console.log("Message sent: %s", info.messageId);
  return;
};

module.exports = { sendMail };
