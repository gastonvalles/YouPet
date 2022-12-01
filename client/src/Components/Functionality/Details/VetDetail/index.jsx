import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearDetails, getVetsDetail } from "../../../../Redux/actions";

export default function VetDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const vet = useSelector((state) => state.vetDetail);

  useEffect(() => {
    dispatch(getVetsDetail(id));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  return (
    <>
      <h1>
        {vet.name} {vet.lastname}
      </h1>
      <img src={vet.img} alt="Not found" />
      <h2>{vet.speciality}</h2>
      <h3>Average: {vet.average}</h3>
      <div>
        <h3>Reviews: {vet.review}</h3>
        <input type="text" placeholder="Leave a comment"></input>
      </div>
    </>
  );
}
