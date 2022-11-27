import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import style from '../ServiceDetail/ServiceDetail.module.css'
import { getServiceDetail, clearDetails } from "../../../../Redux/actions";

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
    <div className={style.containerPrincipal}>
      <div>
      <Link
        to="/"
        type="button"
        className="text-decoration-none btn btn-dark"
      >
        Home
      </Link>
      </div>
      <div className={style.titleDetail}>
      <h1>{service.name}</h1>
      </div>
      <div>
      <h4 >Type: {service.type}</h4>
      <h4>Price: ${service.price}</h4>
      <h4>Time Lapse: {service.timelapse} min</h4>
      </div>
    </div>
  );
}
