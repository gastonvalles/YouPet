import React from "react";
import Service from "../../Services/auth.service";
import { Link } from "react-router-dom";

const Welcome = (props) => {
  if (props.match.path === "/confirm/:confirmation/confirmationCode") {
    Service.verifUser(props.match.params.confirmationCode);
  }

  return (
    <div>
      <header>
        <h3>
          <strong>Cuenta confirmada</strong>
        </h3>
      </header>
      <Link to={"/login"}>PLEASE LOGIN</Link>
    </div>
  );
};
export default Welcome;
