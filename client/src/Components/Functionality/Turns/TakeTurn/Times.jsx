import React from "react";
import { useState } from "react";

import timeSlots from "./timeSlotsCalculator";

import "./turns.css";

function Times(props) {
  const [event, setEvent] = useState(null);
  const [info, setInfo] = useState(false);
  const [time, setTime] = useState([]);
  const [prevButton, setPrevButton] = useState(null);

  // Datos para el time slots
  const turnsList = [
    {
      startTurn: new Date(2021, 1, 10, 12, 0, 0),
      endTurn: new Date(2021, 1, 10, 13, 0, 0),
    },

    {
      startTurn: new Date(2021, 1, 10, 13, 0, 0),
      endTurn: new Date(2021, 1, 10, 14, 0, 0),
    },

    {
      startTurn: new Date(2021, 1, 10, 14, 0, 0),
      endTurn: new Date(2021, 1, 10, 14, 35, 0),
    },
  ];

  const doctorHours = [
    new Date(2021, 1, 10, 10, 0, 0),
    new Date(2021, 1, 10, 16, 0, 0),
  ];

  let date = doctorHours[0];
  let endDate = doctorHours[1];
  let intervalo = 30;

  const timesAvailable = timeSlots(date, endDate, intervalo, turnsList);

  if (timesAvailable?.length && !time.length) {
    let allTimeSlots = timesAvailable.map((times) => times.timeSlot);
    setTime(allTimeSlots);
  }

  function displayInfo(e) {
    setInfo(true);
    setEvent(e.target.innerText);
  }

  const handleClickTime = (e) => {
    displayInfo(e);

    const restoreButton = prevButton;

    if (prevButton !== null) {
      restoreButton.classList.remove("timeSlotButtonActive");
    }

    e.target.classList.add("timeSlotButtonActive");
    setPrevButton(e.target);
  };

  return (
    <div className="timeSlotContainer">
      <div className="d-flex flex-wrap justify-content-center">
        {time.map((times) => {
          return (
            <button
              type="button"
              onClick={(e) => handleClickTime(e)}
              className="timeSlotButton btn btn-outline-info"
            >
              {" "}
              {times}{" "}
            </button>
          );
        })}
      </div>

      <div>
        {info ? `Turn selected at ${event} ${props.date.toDateString()}` : null}
      </div>

      <div>
        <hr />
        <button className="text-decoration-none btn btn-dark">Take turn</button>
      </div>
    </div>
  );
}

export default Times;
