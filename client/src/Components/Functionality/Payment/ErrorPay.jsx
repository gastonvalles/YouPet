import React from "react";
import { Link } from "react-router-dom";
import img from "../../../img/blue-cat.gif";
import "./ErrorPay.css";
export default function ErrorPay() {
  return (
    <div className="errorNoti">
      <h1>Oops.... the payment could not be made!</h1>
      <img src={img} alt="img-paynofound" className="imgCat" />
      <div className="buttonn">
        <Link
          to="/"
          type="button"
          className="text-decoration-none btn btn-dark"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
