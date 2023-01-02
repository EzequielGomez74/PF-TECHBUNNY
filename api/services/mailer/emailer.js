const nodemailer = require("nodemailer");
const { configmailtrap, configgmail } = require("../../config/mailerconfig");

const template = (userdata, object) => {
  if (object.type === "register")
    return {
      // from: '"🐰 TechBunny 🐰" <techbunnypf@gmail.com>', //  si es con la config de gmail  no hace falta el from:
      from: '"🐰 TechBunny 🐰" <info@techbunny.com>', // sender address
      to: `${userdata}`,
      subject: `Hola Bienvenido a TechBunny ✔`, // Subject line
      html: htmlregister, // html body
    };
  if (object.type === "order") {
    return {
      // from: '"🐰 TechBunny 🐰" <techbunnypf@gmail.com>', //  si es con la config de gmail  no hace falta el from:
      from: '"🐰 TechBunny 🐰" <info@techbunny.com>', // sender address
      to: `${userdata}`,
      subject: `Gracias por tu orden✔`, // Subject line
      html: htmlorder, // html body
    };
  }
};
const createTrans = () => {
  const transport = nodemailer.createTransport(configmailtrap);
  return transport;
};
const sendMail = async (userdata, object) => {
  const transporter = createTrans();
  const info = transporter.sendMail(template(userdata, object));
  console.log("Message sent: %s", info.messageId);
  return;
};
module.exports = { sendMail };
const htmlorder = `<table border="0" cellpadding="0" cellspacing="0" bgcolor="#F2F2F2" style="direction:ltr;width:100%;min-width:320px;text-align:center;color:#292c2e;font-family:Arial,Verdana,Heveltica,sans-serif;font-size:1em;">
<tbody>
  <tr>
    <td style="padding:20px 0;text-align:center;">
      <table style="direction:ltr;background-color:#FFF;padding:20px 0;border-radius:15px;margin:0 auto;min-width:280px;max-width:680px;">
        <tbody>
          <tr>
           <td>
             <img src="https://ih1.redbubble.net/image.2653884518.6129/flat,128x,075,f-pad,128x128,f8f8f8.jpg" alt="Place Holder">
            </td>
          </tr>
          <tr>
            <td style="padding:2% 5%">
              <!-- EMAIL BODY -->
              <h2 style="font-size:22px;">Pedido nº 1212 registrado!</h2>
              <p>Olá <b>Fulano</b>, seu novo pedido foi registrado com sucesso!</p>
              <table cellpadding="0" cellspacing="0" style="direction:ltr;width: 100%;">
                <tbody>
                  <tr>
                    <td style="font-weight:bold;text-align:left;">Forma de Entrega</td>
                    <td style="color:#7f8c8d;text-align:right;">Delivery (Entrega)</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;text-align:left;">Última Atualização</td>
                    <td style="color:#7f8c8d;text-align:right;">15/01/2019 às 11:30</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;text-align:left;">CPF/CNPJ na Nota</td>
                    <td style="color:#7f8c8d;text-align:right;">335.560.268-05</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;text-align:left;">Tempo estimado p/ Entrega</td>
                    <td style="color:#7f8c8d;text-align:right;">25 min.</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="font-weight:bold;text-align:left;">Endereço de Entrega</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="color:#7f8c8d;text-align:left;">
                      Rua Apuco Tavares de Souza, 143, Vila São José, 19.905-040, Ourinhos/SP
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;text-align:left;">Forma de Pagamento</td>
                    <td style="color:#7f8c8d;text-align:right;">Master - Débito(Débito)</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;text-align:left;">Taxa de Entrega</td>
                    <td style="color:#7f8c8d;text-align:right;color:#27ae60;">R$ 4,50</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr style="font-weight: bold;font-size:18px;">
                    <td style="font-weight:bold;text-align:left;padding: 15px 0 0;">Total</td>
                    <td style="color:#27ae60;text-align:right;padding: 15px 0 0;">R$ 48,50</td>
                  </tr>
                </tfoot>
              </table>
              <!-- EMAIL BODY END -->
            </td>
          </tr>
          <tr>
            <td style="text-align:center;">
              <hr>
              <small style="color: #bdc3c7;font-style:italic;">Esta mensagem foi enviada automaticamente e não precisa ser respondida.</small>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
  <tr>
    <td style="font-size: 12px; text-align:center;">
      Rua Silva Jardim, 365, Vila Moraes, Ourinhos/SP.
      <br>
      © 2020 Escolpi Pizzaria. Todos os <direit>t</direit>os reservados.
    </td>
  </tr>
</tbody>
</table>
`;

const htmlregister = `<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">
    /* FONTS */
    @media screen {
        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 400;
          src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
        }

        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 700;
          src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
        }

        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 400;
          src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
        }

        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 700;
          src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
        }
    }

    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }

    /* RESET STYLES */
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }

    /* MOBILE STYLES */
    @media screen and (max-width:600px){
        h1 {
            font-size: 32px !important;
            line-height: 32px !important;
        }
    }

    /* ANDROID CENTER FIX */
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
</style>
</head>
<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">

<!-- HIDDEN PREHEADER TEXT -->
<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    We're thrilled to have you here! Get ready to dive into your new account.
</div>

<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <!-- LOGO -->
    <tr>
        <td bgcolor="#D7F136" align="center">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <tr>
                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                        <a href="https://www.i2chain.com/" target="_blank">
                            <img alt="Logo" src="https://cdn.discordapp.com/attachments/1052645530112639087/1057757559089533058/Sin_titulo-1.png" width="200" height="80" style="display: block; width: 100px; max-width: 100px; min-width: 150px; font-family: 'Lato', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">
                        </a>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- HERO -->
    <tr>
        <td bgcolor="#D7F136" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <tr>
                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                      <h1 style="font-size: 36px; font-weight: 400; margin: 0;">Welcome to Tech Bunny!</h1>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- COPY BLOCK -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
              <!-- COPY -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 20px 50px 40px 50px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                  <p style="margin: 0;"> We are super excited you joined today and created your account. Please press on the below button to verify your email address.</p>
              <!-- BULLETPROOF BUTTON -->
              <tr>
                <td bgcolor="#ffffff" align="center">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td bgcolor="#ffffff" align="left" style="padding: 5px 30px 40px 50px;">
                        <table border="0" cellspacing="0" cellpadding="0">
                          <tr>
                              <td align="center" style="border-radius: 70px;" bgcolor="#1ECFCA"><a href="#" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 35px; border-radius: 2px; display: inline-block;">Verify your email address</a></td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
                </td>
              </tr>
              <!-- COPY -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 50px 20px 50px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                  <p style="margin: 0;">This activation link will be expired in 24hrs. If you have any questions, just reply to this email—we're always happy to help out.</p>
                </td>
              </tr>
              <!-- COPY -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 50px 40px 50px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                  <p style="margin: 0;">Cheers,<br>Tech Bunny Team</p>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- SUPPORT CALLOUT -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <!-- HEADLINE -->
                <tr>
                  <td bgcolor="#00afff" align="center" style="padding: 30px 30px 30px 30px; background: #DADADA !important; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                    <h2 style="font-size: 16px; font-weight: 600; color: #fff; margin: 0 0 15px 0;">FOLLOW US</h2>
                    <a style= "margin: 5px;" href="https://www.facebook.com/i2Chain" target="_blank">
                            <img alt="Logo" src="https://i.postimg.cc/ZYrGRHXB/Group-4-1.png" width="200" height="80" style="display: inline; width: 40px; max-width: 100px; min-width: 40px; font-family: 'Lato', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">
                    </a>
                    <a style= "margin: 5px;" href="https://twitter.com/i2_chain" target="_blank">
                            <img alt="Logo" src="https://i.postimg.cc/nVYWZzQq/Group-5-1.png" width="200" height="80" style="display: inline; width: 40px; max-width: 100px; min-width: 40px; font-family: 'Lato', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">
                    </a>
                    <a style= "margin: 5px;" href="https://www.linkedin.com/company/i2chain" target="_blank">
                            <img alt="Logo" src="https://i.postimg.cc/sXJJFM0X/Group-6.png" width="200" height="80" style="display: inline; width: 40px; max-width: 100px; min-width: 40px; font-family: 'Lato', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">
                    </a>
                  </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- FOOTER -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
              <!-- ADDRESS -->
              <tr>
                <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                  <p style="margin-top:20px; text-align:center;font-weight:600;">Tech Bunny , Inc - 1 avenida siempre viva 742 , Springfield, CA 94111</p>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
</table>

</body>
</html>
<!--{% endblock %}-->`;
