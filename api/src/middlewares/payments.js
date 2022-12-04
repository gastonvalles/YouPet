const { Router } = require("express");
const {getPaymentLink} = require ("../controllers/getPaymentLink")
require("dotenv").config();
const { ACCESS_TOKEN } = process.env;

// SDK de Mercado Pago
const mercadopago = require("mercadopago");
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

router.post('/notify', (req, res) => {
  const { body, query } = req;
  console.log("notificar")
  console.log({ body, query });
})

module.exports = router;
