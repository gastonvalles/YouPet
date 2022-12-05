import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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
            <form action={PaymentLink.init_point}>
              <input type="submit" value="Pagar" />
            </form>
          )}
          <h4>You will be redirected to home</h4>
        </>
      </div>
    </>
  );
}
