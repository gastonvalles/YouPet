import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
<<<<<<< HEAD
import style from '../ServiceDetail/ServiceDetail.module.css'
import { getServiceDetail, clearDetails } from "../../../../Redux/actions";
=======
import { clearDetails, getServiceDetail } from "../../../../Redux/actions";
>>>>>>> c16122abe4eb4fbf942393b2e7c78703317254c1

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
<<<<<<< HEAD
    <div className={style.containerPrincipal}>
=======
    <>
>>>>>>> c16122abe4eb4fbf942393b2e7c78703317254c1
      <div>
        <h1>{service.name}</h1>
      </div>
<<<<<<< HEAD
      <div className={style.titleDetail}>
      <h1>{service.name}</h1>
      </div>
      <div>
      <h4 >Type: {service.type}</h4>
      <h4>Price: ${service.price}</h4>
      <h4>Time Lapse: {service.timelapse} min</h4>
=======
      <div className="grid-fluid">
        <h4>{service.type}</h4>
        <h4>Price: ${service.price}</h4>
        <h4>Timelapse: {service.timelapse} min</h4>
>>>>>>> c16122abe4eb4fbf942393b2e7c78703317254c1
      </div>
      <Link
        to="vet"
        type="button"
        className="text-decoration-none btn btn-dark"
      >
        Take turn
      </Link>
    </>
  );
}
