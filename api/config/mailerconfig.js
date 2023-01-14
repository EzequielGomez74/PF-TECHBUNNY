const configmailtrap = {                                // CONFIGURACION PARA USAR CON MAILTRAP.IO
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "1ef6fe06ca1a59",
    pass: "fce9636e6ff13f",
  },
};

const configgmail = {                                   // CONFIGURACION PARA USAR CON GMAIL
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "techbunnypf@gmail.com", 
    pass: "eusceaijmmpwfkut", 
  },
};
module.exports = {configgmail, configmailtrap};
