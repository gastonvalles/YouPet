import React from "react";
import "./ServiceCard.css"
export default function ServiceCard({ name }) {
  return (
    <div className="cardl">
      <div className="cardl_image">
        <img src="https://img.freepik.com/foto-gratis/cerca-veterinario-cuidando-gato_23-2149100172.jpg" />
      </div>
      <div className="cardl_title title-white">
        <p>{name}</p>
      </div>
    </div>
  );
}
