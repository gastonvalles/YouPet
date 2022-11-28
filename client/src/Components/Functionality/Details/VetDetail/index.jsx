import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVetsDetail, clearDetails } from "../../../../Redux/actions";

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
    <div>
      <div>
        <h1>
          {vet.name} {vet.lastname}
        </h1>
        <h3>Speciality: {vet.speciality}</h3>
        <h3>Average: {vet.average}</h3>
        <h3>Reviews:</h3>
        {/* {vet.review?.map((review) => {
          return <h5>{review}</h5>;
        })} */}
      </div>
    </div>
  );
}
