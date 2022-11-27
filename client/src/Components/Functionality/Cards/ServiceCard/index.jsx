import React from "react";

export default function ServiceCard({ name }) {
  return (
    <div className="card bg-dark">
      <h3>{name}</h3>
    </div>
  );
}
