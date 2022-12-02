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
      <h1>{service.name}</h1>
      <img src={service.img} alt="Not found" />
      <h2>{service.detail}</h2>
      <p>Timelapse: {service.timelapse} min</p>
      <p>Price: ${service.price}</p>
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
