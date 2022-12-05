const { Router, query } = require("express");
const { getPaymentLink } = require("../controllers/getPaymentLink");
require("dotenv").config();
const { ACCESS_TOKEN } = process.env;

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const { merchant_orders } = require("mercadopago");
const { dbNotifyPayment } = require("../controllers/postNotifyPayment");
// Agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN,
});

const router = Router();

router.post("/mp/:userId", async (req, res) => {
  const userId = req.params.userId
  console.log(userId);
  // Agrega credenciales
  const services = req.body;
  //forma de services:
  //[{name,price}]

  const preference = await getPaymentLink(services,userId);

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

router.post("/notify/:userId", async (req, res) => {
  const { query } = req;
  const userId = req.params;
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
      var merchantOrder = await mercadopago.merchant_orders.findById(
        payment.body.order.id
      );
      console.log("payment", merchantOrder);
      break;

    case "merchant_order":
      const orderId = query.id;
      console.log(topic, "getting merchan order", orderId);
      var merchantOrder = await mercadopago.merchant_orders.findById(orderId);
      console.log("merchant_order", merchantOrder);
      break;
  }
  //comprobar si el estado de cada pago si se cerro y aprobo el pago
  console.log("datos que tomar: ", merchantOrder);
  let paidAmount = 0;
  merchantOrder.body.payments.forEach((payment) => {
    if (payment.status === "approved") {
      paidAmount += payment.transaction_amount;
    }
  });
  if (paidAmount >= merchantOrder.body.total_amount) {
    console.log("El pago se concreto");
    console.log(merchantOrder.body.collector.nickname);
    //funcion (usuarioId)
    const notify = {
      userId: userId.userId,
      idPaid: merchantOrder.body.id,
      idPreference: merchantOrder.body.preference_id,
      idUserMP: merchantOrder.body.collector.nickname,
      statuss: merchantOrder.body.status,
      orderStatus:merchantOrder.body.order_status
    }
    console.log("notificacion", notify);

    await dbNotifyPayment(notify)
    console.log(await dbNotifyPayment(notify));
    return res.status(200).send("OK")
    
  } else {
    console.log("El pago no se concreto");
  }
});

module.exports = router;
