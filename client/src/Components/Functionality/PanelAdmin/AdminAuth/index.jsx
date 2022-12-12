import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function ConfirmAdmin () {
  const [verify, setVerify] = useState(null);
  const { confirmationCode } = useParams();
  useEffect(() => {
    if (confirmationCode)
      axios
        .get(`http://localhost:3001/autadmin/adminlogin/${confirmationCode}`)
        .then(() => {
          setVerify(true);
        })
        .catch(() => {
          setVerify(false);
        });
  }, [confirmationCode]);
  if (verify === null) return <div>estamos verificando tu cuenta</div>;
  if (!verify) return <div>No pudimos confirmar tu cuenta</div>;
  return (
    <div>
      <header>
        <h3>
          <strong>Cuenta confirmada</strong>
        </h3>
      </header>
      <Link to={"/loginadmin"} type="button" className="text-decoration-none btn btn-primary">PLEASE LOGIN</Link>
    </div>
  );
}