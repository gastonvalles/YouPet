import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentMP } from "../../../Redux/actions";
export default function Payment() {
  const dispatch = useDispatch();
  const PaymentLink = useSelector((state) => state.paymentLink);

  const handleClick = (e) => {
    dispatch(
      getPaymentMP([
        {
          name: "vacuna",
          price: 50,
        },
      ])
    );
  };
  return (
    <>
      <div>
        <>
          <h1>Are you sure of the turn?</h1>
          {!PaymentLink.id ? (
            <button
              onClick={(e) => {
                handleClick(e);
              }}
              type="button"
              className="btn btn-primary"
            >
              Pay in Mercado Pago
            </button>
          ) : (
            <>
              <a href={PaymentLink.init_point} className="btn btn-success">
                Pagar
              </a>
            </>
          )}
          <h4>You will be redirected to home</h4>
        </>
      </div>
    </>
  );
}
