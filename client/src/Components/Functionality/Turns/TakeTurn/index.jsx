import "./turns.css";

import Calendar from "react-calendar";
import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";


import Times from "./Times";

function TakeTurns(props) {
 
  

  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  const miniDate = new Date();
  const { servId } = useParams();
  const navigate = useNavigate();
  const path = `/service/${servId}`;

  return (
    <div className="container">
      <h1 className="header">Take a Turn</h1>

      <div className="container d-flex p-2 justify-content-center">
        <div className="calendar-container">
          <Calendar
            onChange={setDate}
            value={date}
            onClickDay={() => setShowTime(true)}
            minDate={miniDate}
          />
        </div>
        <div>
          <Times showTime={showTime} date={date} vetSelect={props.vetSelect} updateCalendar={props.updateCalendar} setUpdateCalendar={props.setUpdateCalendar} />
        </div>
      </div>
      <button onClick={() => navigate(path)} className={"btn"}>
        Go back
      </button>
    </div>
  );
}

export default TakeTurns;
