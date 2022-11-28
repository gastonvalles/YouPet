import React from "react";
import "./ServiceCard.css";

export default function ServiceCard({ name }) {
  return (
    <div className="card mb-3">
      <h3>{name}</h3>
    </div>
  );
}
