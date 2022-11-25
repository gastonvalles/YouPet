import React from "react";

export default function VetCard({ image, name, lastName }) {
  return (
    <div className="card bg-dark">
      <div>
        <img src={image} alt="médico" height="200px" width="200px" />
        <div className="card-body">
          <h4 className="card-title">
            Full Name: {name} {lastName}
          </h4>
        </div>
      </div>
    </div>
  );
}
