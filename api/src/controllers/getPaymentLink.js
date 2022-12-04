const getPaymentLink = async(services) => {
  const items = await services.map((e) => {
    return {
      title: e.name,
      unit_price: parseFloat(e.price),
      quantity: 1,
      currency_id: "ARS",
    };
  });

  let preference = {
    items: items,
    back_urls: {
      success: "/success",
      failure: "/youpet.com",
    },
    auto_return: "approved",
    binary_mode: true,
    notification_url:'https://30be-181-199-156-167.sa.ngrok.io/payment/notify'
  };
  return preference;
};

module.exports = {
    getPaymentLink
  };