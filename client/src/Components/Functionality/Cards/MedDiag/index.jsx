import React from "react";
import style from "../MedDiag/MedDiag.module.css";

export default function MedicalDiagnostic({ detail, date }) {
  return (
    <div className="MedicalDiagnostic">
      <h4>Date: {date}</h4>
      <h4>Detail: {detail}</h4>
    </div>
  );
}
