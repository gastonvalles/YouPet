const { Router, query } = require("express");
const { getPaymentLink } = require("../controllers/getPaymentLink");
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

router.post("/notify", async (req, res) => {
  const { query } = req;
  console.log("notificar");
  console.log({ query });
  //Ya que llegan dos tipos de objetos con los datos desde el query (asi es el sist de mercado pago)
  //hago un swicht para determinar de que tipo es para poder  trabajarlo
  let topic = query.topic || query.type;
  switch (topic) {
    case "payment":
      const paymentId = query.id || query["data.id"];
      console.log(topic, "getting payment", paymentId);
      let payment = await mercadopago.payment.findById(paymentId);
      //console.log(payment);
      console.log(topic, "getting merchant order");
      var { body } = await mercadopago.merchant_orders.findById(
        payment.body.order.id
      );
      break;

    case "merchart_order":
      const orderId = query.id;
      console.log(topic, "getting merchan order", orderId);
      var { body } = await mercadopago.merchant_orders.findById(orderId);
      break;
  }
  //comprobar si el estado de cada pago si se cerro y aprobo el pago
  let paidAmount = 0;
  body.payments.forEach((payment) => {
    if (payment.status === "approved") {
      paidAmount += payment.transaction_amount;
    }
  });
  if (paidAmount >= body.total_amount) {
    console.log("El pago se concreto");
  } else {
    console.log("El pago no se concreto");
  }
});

module.exports = router;
