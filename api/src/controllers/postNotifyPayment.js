const { Payments } = require("../db.js");
const dbNotifyPayment = async (notify) => {
  console.log("notificacion", notify);
  if (
    !notify.userId &&
    !notify.idPaid &&
    !notify.idPreference &&
    !notify.idUserMP &&
    !notify.statuss &&
    !notify.orderStatus
  ) {
    throw new Error("Missing params");
  } else {
    try {
      /* 
      let newPayment = await Payments.create({
        idPaid: notify.idPaid,
        idPreference: notify.idPreference,
        idUserMP: notify.idUserMP,
        status: notify.status,
        orderStatus: notify.orderStatus,
      });
      const userDB = await User.findAll({
        where: { id: notify.userId },
      });
      await newPayment.addUser(userDB);
      return newPayment; */
      const paidDB = await Payments.findAll({
        where: { idPaid: notify.idPaid.toString() },
      });
      console.log(paidDB);
      if (paidDB.length===1) {
        return `Pago ya registrado id: ${notify.idPaid}`;
      } else {
        let newPayment = await Payments.create({
          idPaid: notify.idPaid.toString(),
          idPreference: notify.idPreference,
          idUserMP: notify.idUserMP,
          status: notify.statuss,
          orderStatus: notify.orderStatus,
        });
        return `Pago registrado id: ${notify.idPaid}`;
      }
    } catch (error) {
      console.log(`Error ${error} in postPayment `);
      throw `Error ${error} in postPayment `;
    }
  }
};

module.exports = {
  dbNotifyPayment,
};
