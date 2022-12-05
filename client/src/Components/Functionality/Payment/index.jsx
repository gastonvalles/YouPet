import React from "react";
import { Link } from "react-router-dom";
export default function Payment() {
    
  return (
    <>
      <div>
        <>
          <h1>Are you sure of the turn?</h1>
            <Link  to="/profile/:id">
          <button type="button" className="btn btn-primary">
            Pay in Mercado Pago
                      </button>
                      </Link>
          <h4>You will be redirected to home</h4>
        </>
      </div>
    </>
  );
}
