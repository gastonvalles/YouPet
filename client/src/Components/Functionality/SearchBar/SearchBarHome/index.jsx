import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getServiceByName, getVetByName } from "../../../../Redux/actions";

export default function SearchBarHome() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(event) {
    event.preventDefault();
    setName(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(getServiceByName(name));
    dispatch(getVetByName(name));
    setName("");
  }

  return (
    <div>
      <input type="text" placeholder="Search" onChange={(event)=>handleInputChange(event)}/>
      <button type="button" onClick={(event)=>handleSubmit(event)}>Search</button>
    </div>
  );
}
