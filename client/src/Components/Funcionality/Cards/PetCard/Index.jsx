import React from "react";

export default function PetCard({
  name,
  species,
  medicalDiagnostic,
  description,
}) {
  return (
    <div>
      <div>
        <h1>Name: {name}</h1>
        <h4>Species: {species}</h4>
        <h4>Description: {description}</h4>
      </div>
      <div>
        <h4>Medical Diagnostic: {medicalDiagnostic}</h4>
      </div>
    </div>
  );
}
