import React from "react";

export default function MedicalDiagnostic({ detail, date }) {
  return (
    <div>
      <h4>Date: {date}</h4>
      <h4>Detail: {detail}</h4>
    </div>
  );
}
