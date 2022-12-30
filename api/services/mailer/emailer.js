const nodemailer = require("nodemailer");
const { configmailtrap, configgmail } = require("../../config/mailerconfig");
const {pedidotemplate} = require ("../mailer/templates/pedidotemplate.js")
const {welcometemplate} = require ("../mailer/templates/welcometemplate.js")

const template = (userdata,object) => {
  if (object.type==="newsletter") {
    return{
      // from: '"🐰 TechBunny 🐰" <techbunnypf@gmail.com>', //  si es con la config de gmail  no hace falta el from:
      from: '"🐰 TechBunny 🐰" <info@techbunny.com>', // sender address
      to: `${userdata}`,
      subject: `Gracias por suscribirte al newsletter ✔`, // Subject line
      html: newslettertemplate , // html body
    }}
   if(object.type==="register"){
  return {
    // from: '"🐰 TechBunny 🐰" <techbunnypf@gmail.com>', //  si es con la config de gmail  no hace falta el from:
    from: '"🐰 TechBunny 🐰" <info@techbunny.com>', // sender address
    to: `${userdata}`,
    subject: `Hola Bienvenido a TechBunny ✔`, // Subject line
    html: welcometemplate(userdata,object), // html body
  };}
  if(object.type==="order"){
    return { 
      // from: '"🐰 TechBunny 🐰" <techbunnypf@gmail.com>', //  si es con la config de gmail  no hace falta el from:
      from: '"🐰 TechBunny 🐰" <info@techbunny.com>', // sender address
      to: `${userdata}`,
      subject: `Gracias por tu orden✔`, // Subject line
      html: pedidotemplate(userdata,object) , // html body
    };
  }
};
const createTrans = () => {
const transport = nodemailer.createTransport(configmailtrap)
return transport;
}
const sendMail = async (userdata,object) => {
  const transporter = createTrans()
  const info = await transporter.sendMail(template(userdata,object));
  console.log("Message sent: %s", info.messageId);
  return 
}



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
`


const newslettertemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="font-family:arial, 'helvetica neue', helvetica, sans-serif">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>Newsletter</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]--><!--[if !mso]><!-- -->
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet"><!--<![endif]-->
  <style type="text/css">
#outlook a {
	padding:0;
}
.es-button {
	mso-style-priority:100!important;
	text-decoration:none!important;
}
a[x-apple-data-detectors] {
	color:inherit!important;
	text-decoration:none!important;
	font-size:inherit!important;
	font-family:inherit!important;
	font-weight:inherit!important;
	line-height:inherit!important;
}
.es-desk-hidden {
	display:none;
	float:left;
	overflow:hidden;
	width:0;
	max-height:0;
	line-height:0;
	mso-hide:all;
}
[data-ogsb] .es-button {
	border-width:0!important;
	padding:10px 30px 10px 30px!important;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:30px!important; text-align:center!important } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:center!important } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important; text-align:center!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:center!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:18px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0!important } .es-m-p0r { padding-right:0!important } .es-m-p0l { padding-left:0!important } .es-m-p0t { padding-top:0!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } .es-m-p5 { padding:5px!important } .es-m-p5t { padding-top:5px!important } .es-m-p5b { padding-bottom:5px!important } .es-m-p5r { padding-right:5px!important } .es-m-p5l { padding-left:5px!important } .es-m-p10 { padding:10px!important } .es-m-p10t { padding-top:10px!important } .es-m-p10b { padding-bottom:10px!important } .es-m-p10r { padding-right:10px!important } .es-m-p10l { padding-left:10px!important } .es-m-p15 { padding:15px!important } .es-m-p15t { padding-top:15px!important } .es-m-p15b { padding-bottom:15px!important } .es-m-p15r { padding-right:15px!important } .es-m-p15l { padding-left:15px!important } .es-m-p20 { padding:20px!important } .es-m-p20t { padding-top:20px!important } .es-m-p20r { padding-right:20px!important } .es-m-p20l { padding-left:20px!important } .es-m-p25 { padding:25px!important } .es-m-p25t { padding-top:25px!important } .es-m-p25b { padding-bottom:25px!important } .es-m-p25r { padding-right:25px!important } .es-m-p25l { padding-left:25px!important } .es-m-p30 { padding:30px!important } .es-m-p30t { padding-top:30px!important } .es-m-p30b { padding-bottom:30px!important } .es-m-p30r { padding-right:30px!important } .es-m-p30l { padding-left:30px!important } .es-m-p35 { padding:35px!important } .es-m-p35t { padding-top:35px!important } .es-m-p35b { padding-bottom:35px!important } .es-m-p35r { padding-right:35px!important } .es-m-p35l { padding-left:35px!important } .es-m-p40 { padding:40px!important } .es-m-p40t { padding-top:40px!important } .es-m-p40b { padding-bottom:40px!important } .es-m-p40r { padding-right:40px!important } .es-m-p40l { padding-left:40px!important } }
</style>
 </head>
 <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <div class="es-wrapper-color" style="background-color:#FAFAFA"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#fafafa"></v:fill>
			</v:background>
		<![endif]-->
   <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
     <tr>
      <td valign="top" style="padding:0;Margin:0">
       <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
             <tr>
              <td align="left" style="padding:0;Margin:0">
               <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:600px">
                   <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFFFFF;font-size:14px"><img class="adapt-img" src="https://cdn.discordapp.com/attachments/1052645530112639087/1058107682160128151/chinesenewyearcelebrationwithrabbit_1.png" alt="We want to hear you" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600" title="We want to hear you"></a></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table bgcolor="#FE7469" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FE7469;width:600px">
             <tr>
              <td align="left" style="padding:0;Margin:0;padding-left:30px;padding-right:30px">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:540px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0"><h1 style="Margin:0;line-height:54px;mso-line-height-rule:exactly;font-family:Montserrat, helvetica, arial, sans-serif;font-size:36px;font-style:normal;font-weight:normal;color:#FFFFFF"><br><b>Bienvenido al newsletter !</b></h1></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" style="Margin:0;padding-top:10px;padding-bottom:30px;padding-left:30px;padding-right:30px">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:540px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" class="es-m-p0r es-m-p0l" style="padding:0;Margin:0;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;line-height:21px;color:#FFFFFF;font-size:14px">recibirás ofertas semanales&nbsp;</p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
             <tr>
              <td align="left" style="padding:30px;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:540px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;font-size:0">
                       <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:20px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#52687E;font-size:14px"><img src="https://cdn.discordapp.com/attachments/1052645530112639087/1058109016334680104/facebook-logo-black.png" alt="Fb" title="Facebook" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:20px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#52687E;font-size:14px"><img src="https://cdn.discordapp.com/attachments/1052645530112639087/1058109016930259135/twitter-logo-black.png" alt="Tw" title="Twitter" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
                          <td align="center" valign="top" style="padding:0;Margin:0;padding-right:20px"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#52687E;font-size:14px"><img src="https://cdn.discordapp.com/attachments/1052645530112639087/1058109016636661790/instagram-logo-black.png" alt="Ig" title="Instagram" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
                          <td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://viewstripo.email" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#52687E;font-size:14px"><img src="https://cdn.discordapp.com/attachments/1052645530112639087/1058109017211289711/youtube-logo-black.png" alt="Yt" title="Youtube" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
                         </tr>
                       </table></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:30px;padding-bottom:30px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;line-height:21px;color:#52687E;font-size:14px">No quieres recibir mas mensajes?<br><a href="" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#52687E;font-size:14px">Desuscribirse</a>&nbsp;<br><br>Copyright© 2022 Tech Bunny<br><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#52687E;font-size:14px;line-height:21px" href="tel:+(000)123-456-789">+(000) 123-456-789</a><br><br><a href="https://viewstripo.email" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#52687E;font-size:14px">View this email in your browser.</a></p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
  </div>
 </body>
</html>`
module.exports = { sendMail }
