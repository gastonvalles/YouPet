import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearDetails, getServiceDetail } from "../../../../Redux/actions";

export default function ServiceDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.serviceDetail);

  useEffect(() => {
    dispatch(getServiceDetail(id));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  return (
    <>
      <div>
        <h1>{service.name}</h1>
      </div>
      <div className="grid-fluid">
        <p>{service.detail}</p>
        <p>Timelapse: {service.timelapse} min</p>
        <p>Price: ${service.price}</p>
      </div>
      <Link
        to="turn"
        type="button"
        className="text-decoration-none btn btn-dark"
      >
        Take turn
      </Link>
    </>
  );
}
