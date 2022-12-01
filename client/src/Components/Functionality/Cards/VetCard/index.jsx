import React from "react";

export default function VetCard({ name, lastname, img }) {
    return (
        <div className="cardl">
            <div className="cardl_image">
                <img src={img} alt="Not found" />
            </div>
            <div className="cardl_title title-white">
                <p>{name} {lastname}</p>
            </div>
        </div>
    );
}
