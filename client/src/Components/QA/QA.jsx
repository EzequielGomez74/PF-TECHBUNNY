import React, { useEffect } from 'react'
import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'
import QADropdown from './QADropdown'
import s from './QA.module.css'
import { useSelector } from 'react-redux';

function QA() {
    const dm = useSelector(state => state.darkMode);

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [])
    
  return (
    <div className={dm? s.dmqaPage : s.qaPage}>
        <NavBar />
        <section className={dm? s.dmqaSection : s.qaSection}>
            <h3>Preguntas Frecuentes</h3>
            <div>
                <h4>CUENTA</h4>
                { cuenta.length && cuenta.map(c => <QADropdown question={c.question} answer={c.answer} /> ) }
            </div>
            <br />
            <div>
                <h4>PAGOS</h4>
                { pagos.length && pagos.map(c => <QADropdown question={c.question} answer={c.answer} /> ) }
            </div>
            <div>
                <h4>RESEÑAS</h4>
                { reseñas.length && reseñas.map(c => <QADropdown question={c.question} answer={c.answer} /> ) }
            </div>
            <div>
                <h4>GARANTÍAS</h4>
                { garantias.length && garantias.map(c => <QADropdown question={c.question} answer={c.answer} /> ) }
            </div>
            <div>
                <h4>DEVOLUCIONES</h4>
                { devoluciones.length && devoluciones.map(c => <QADropdown question={c.question} answer={c.answer} /> ) }
            </div>
            <div>
                <h4>REEMBOLSOS</h4>
                { reembolsos.length && reembolsos.map(c => <QADropdown question={c.question} answer={c.answer} /> ) }
            </div>
        </section>
        <Footer />
    </div>
  )
}

export default QA


const cuenta = [{
    question:'¿Por qué crear una cuenta en TECHBUNNY?',
    answer: 'Al crear una cuenta en nuestro sitio, tendrás la oportunidad de comprar en la tienda con mayor diversidad de productos de tecnología y gaming . ¡Registrarse en TECHBUNNY es completamente gratis!En tu cuenta, podrás almacenar y gestionar todos tus datos personales. Además, podrás rastrear tus pedidos, crear listas de favoritos, acceder a promociones especiales, ¡entre muchas cosas más!'
}, {
    question:'¿Cómo accedo a mi cuenta?',
    answer: 'Siempre que ingreses a TECHBUNNY, puedes acceder a tu cuenta haciendo clic en "Iniciar sesión". Ingresa tu correo y contraseña o, si lo prefieres, conéctate con nosotros a través de Google+.'
},{
    question:'¿Cómo elimino mi cuenta?',
    answer: 'Si deseas eliminar tu cuenta, por favor, contáctanos a contacto@techbunny.com. Nosotros te ayudaremos a borrarla.No olvides que una vez que eliminemos tu cuenta, no podrás volver a recuperar tu información, pues todo será retirado de nuestro sistema.'
}]

const pagos= [{
    question: 'Sobre Método de Pago: Mercado Pago',
    answer:'Tu dinero disponible en Mercado Pago se transfiere al instante a la cuenta del receptor. Paga con Mercado Pago y tu compra estará 100% protegida. Te devolveremos el dinero si el producto no es lo que esperabas.'
}]

const reseñas = [{
    question:'¿Qué es y para qué sirve una reseña?',
    answer:'Son comentarios que nuestros usuarios han realizado sobre los productos que han comprado y los vendedores de los mismos. Son totalmente confiables, ya que cada usuario expresa libremente su experiencia de compra en TECHBUNNY. Calificar el servicio de nuestros vendedores y la calidad de los productos nos permite tener una retroalimentación efectiva. En TECHBUNNY te invitamos a que antes de realizar una compra, leas los comentarios que otros usuarios han escrito y, cuando seas tú quien compre un producto, nos ayudes de la misma forma: escribiendo tu propia reseña.'
}, {
    question:'¿Quién puede escribir las reseñas en TECHBUNNY?',
    answer:'Puedes escribir tus propias reseñas si ya estás registrado en TECHBUNNY y has realizado al menos una compra con nosotros. Por favor, recuerda que solo puedes publicar una reseña por producto y vendedor.'
},{
    question:'Ya escribí mi reseña, pero aún no la veo publicada',
    answer:'Todas las reseñas deberán ser validadas. A continuación te detallamos los motivos de rechazo de una reseña: (a) Contenido ofensivo. (b) Información personal. (c) Información de la competencia. (d) Información no relacionada con el producto. (e) Cualquier tipo de pregunta. (f) Comentarios relacionados a la piratería. (g) Respuestas o comentarios sobre otras reseñas. (h) Comparación con otros sitios o tiendas. (i) Comentarios en un idioma diferente al español.'
}]

const garantias = [{
    question:'¿Cómo funciona una garantía en TECHBUNNY?',
    answer: 'A partir del momento en que recibes tu producto, tienes 10 días naturales (Productos nacionales) o 14 días naturales (Productos internacionales), para solicitar la devolución directamente con nosotros. Después de este tiempo, si tu producto presenta alguna falla técnica o desperfecto de fábrica, deberás hacer válida la garantía directamente con el proveedor o fabricante.En caso de necesitar los datos de algún proveedor, te podrás contactar con nosotros a través de contacto@techbunny.com.'
}, {
    question:'¿Por cuánto tiempo es válida la garantía?',
    answer: 'El tiempo de la garantía es válida siempre que te encuentres dentro del plazo mencionado en las características del producto adquirido. Recuerda que: (1) La vigencia de la garantía se contabiliza desde que tu producto es entregado. (2) La vigencia de la garantía se puede aplicar de forma diferente sobre las piezas o accesorios del producto. En caso de necesitar los datos de algún proveedor, te podrás contactar con nosotros a través de contacto@techbunny.com.'
},{
    question:'¿Todos los productos TECHBUNNY tienen garantía?',
    answer: 'Sí, los productos que compras en TECHBUNNY tienen un tiempo de garantía. En las características del producto adquirido, encontrarás el plazo de la garantía.'
}]

const devoluciones = [{
    question:'¿Cuánto tiempo tengo para devolver un producto?',
    answer:'Recuerda que tienes 10 días naturales para productos locales o 14 días naturales para productos internacionales, a partir de la fecha en que lo recibiste, para devolver tus productos. Además, ¡en TECHBUNNY las devoluciones son gratis!'
}, {
    question:'¿En qué condiciones debe estar el producto y el empaque?',
    answer:'Adicional al motivo y comentario de devolución, que facilitan procesar tu devolución, es importante que se cumplan las siguientes condiciones: (1) Producto: Sin señales de uso, daños físicos, precintos de seguridad alterados, accesorios completos. (2) Empaque: En óptimo estado, sin abolladuras o adhesivos que generen daño al momento de retirarlos.(3) Documentación: Comprobante de compra, guía de remisión y toda documentación adicional recibida al momento de la entrega. En caso de que la devolución sea de un celular, éste debe venir sin claves ni bloqueos.'
}, {
    question:'¿En qué consiste el Control de Calidad?',
    answer:'Una vez recibido el producto, dentro de los 3 días hábiles te informaremos cual ha sido el resultado del control de calidad, donde se pueden presentar 3 escenarios: (1) Cambio: En caso hayas solicitado la devolución por un cambio de talla, color, entre otros y el proveedor aun cuente con el producto deseado, nos pondremos en contacto contigo para realizar el cambio. (2) Aprobación: Si la devolución es exitosa, te enviaremos de inmediato un cupón por el monto pagado por el producto. Si no deseas el cupón puedes solicitar el reembolso del mismo. El tiempo de reembolso dependerá de la forma de pago que hayas elegido. (3) Rechazo: En caso no se haya cumplido con lo indicado en nuestras políticas de devolución o no se cumplan las condiciones del producto y empaque, nos pondremos en contacto. Y si presentas inconvenientes desde la web para solicitar la devolución o descargar la guía, agradeceremos que te contactes inmediatamente con nosotros vía chat online, correo o llamada.'
}]

const reembolsos = [{
    question:'¿Cómo funcionan los reembolsos en TECHBUNNY?',
    answer:'(a) POR CANCELACIÓN: Una vez cancelada tu orden, sea por tu propia voluntad o cancelado por el proveedor o TECHBUNNY por algún error en el pedido o falta de inventario; se generará un Cupón de forma inmediata, el cual te será enviado a través de tu correo electrónico. (b) POR DEVOLUCIÓN: Una vez el Producto llegue a las bodegas del proveedor o de TECHBUNNY, y apruebe el control de calidad, se te enviará un cupón de crédito con el dinero pagado por tu orden incluyendo el costo de envío, si aplica, el mismo podrás usarlo de inmediato en tus compras en TECHBUNNY.'
}, {
    question:'¿El reembolso está ligado a la forma de pago que elegí?',
    answer:'Sí, los reembolsos se efectuarán acorde a la forma de pago que utilizaste.Mercado Pago: El reembolso se realizará a tu Mercado Pago, una vez aceptada la devolución y/o cambio.'
}, {
    question:'¿Cuánto tiempo tarda el reembolso?',
    answer:'En cualquier método de pago, tu solicitud de reembolso será atendida dentro de las 48 hrs hábiles.'
}]