const { Router, query } = require("express");
const {getPaymentLink} = require ("../controllers/getPaymentLink")
require("dotenv").config();
const { ACCESS_TOKEN } = process.env;

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const { merchant_orders } = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

const router = Router();

router.post("/mp", async (req, res) => {
  // Agrega credenciales
  const services = req.body;

  const preference = await getPaymentLink(services);

  mercadopago.preferences
    .create(preference)
    .then((response) => {
      console.log(response);
      return res.json({
        id: response.body.id,
        init_point: response.body.init_point,
      });
    })
    .catch((error) => console.log(error));
});

router.post('/notify', async (req, res) => {
  const { body, query } = req;
  console.log("notificar")
  console.log({ query });
  //mercadopago.merchant_orders.findById(id).then(res=>console.log(res.body))
  let topic = query.topic || query.type
  switch (topic) {
    case "payment":
      const paymentId = query.id || query['data.id'];
      console.log(topic, 'getting payment', paymentId);
      let payment = await mercadopago.payment.findById(paymentId);
      //console.log(payment);
      console.log(topic, 'getting merchant order');
      let merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id)
      break;
    
    case "merchart_order":
      const orderId = query.id;
      console.log(topic, 'getting merchan order', orderId);
      merchantOrder = await mercadopago.merchant_orders.findById(orderId)
      break;
  }
})

module.exports = router;
