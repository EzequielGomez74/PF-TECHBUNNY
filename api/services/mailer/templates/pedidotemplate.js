const pedidotemplate = (completePath, userdata) => {
  return `
<table border="0" cellpadding="0" cellspacing="0" bgcolor="#F2F2F2" style="direction:ltr;width:100%;min-width:320px;text-align:center;color:#292c2e;font-family:Arial,Verdana,Heveltica,sans-serif;font-size:1em;">
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
              <h2 style="font-size:22px;">Pedido n°${userdata.order_id} registrado!</h2>
              <p>Hola <b>${userdata.name}</b>, Su nuevo pedido fue creado con exito!</p>
              <table cellpadding="0" cellspacing="0" style="direction:ltr;width: 100%;">
                <tbody>
                  <tr>
                    <td style="font-weight:bold;text-align:left;">Forma de Entrega</td>
                    <td style="color:#7f8c8d;text-align:right;">Delivery (Entrega)</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;text-align:left;">Última Atualizacion</td>
                    <td style="color:#7f8c8d;text-align:right;">${userdata.updatedAt}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;text-align:left;">CPF/CNPJ na Nota</td>
                    <td style="color:#7f8c8d;text-align:right;">335.560.268-05</td>
                  </tr>
                  <tr>Tiempo Estimado de entrega</td>
                    <td style="color:#7f8c8d;text-align:right;">25 min.</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="font-weight:bold;text-align:left;">Direccion de entrega</td>
                  </tr>
                  <tr>
                    <td colspan="2" style="color:#7f8c8d;text-align:left;">
                    ${userdata.defaultShippingAddress}
                    </td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold;text-align:left;">Estado de pago</td>
                    <td style="color:#7f8c8d;text-align:right;">${userdata.status}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr style="font-weight: bold;font-size:18px;">
                    <td style="font-weight:bold;text-align:left;padding: 15px 0 0;">Total</td>
                    <td style="color:#27ae60;text-align:right;padding: 15px 0 0;"> $${userdata.total}</td>
                  </tr>
                </tfoot>
              </table>
              <!-- EMAIL BODY END -->
            </td>
          </tr>
          <tr>
            <td style="text-align:center;">
              <hr>
              <small style="color: #bdc3c7;font-style:italic;">Este mensaje fue generado de forma automatica , no es necesario que lo responda</small>
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
};
module.exports = { pedidotemplate };
