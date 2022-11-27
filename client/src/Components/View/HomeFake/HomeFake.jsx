import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getVets, getServices, filterService } from "../../../Redux/actions";
import ServiceCard from "../../Functionality/Cards/ServiceCard";
import VetCard from "../../Functionality/Cards/VetCard/index";
import "./HomeFake.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVets = useSelector((state) => state.vets);
  const allServices = useSelector(
    (state) => state.filterService || state.services
  );

  useEffect(() => {
    dispatch(getVets());
    dispatch(getServices());
  }, [dispatch]);

  return (
    <div>
      <div>
        <select
          onChange={(e) => {
            dispatch(filterService(e.target.value));
          }}
          defaultValue={""}
          className="selectorFiltros"
        >
          <option disabled value={""}></option>
          <option value="">All Service</option>
          <option value={"Healthcare Clinic"}>Healthcare Clinic</option>
          <option value={"Surgery and Anesthesia"}>
            Surgery and Anesthesia
          </option>
          <option value={"Diagnostics"}>Diagnostics</option>
          <option value={"Aesthetics"}>Aesthetics</option>
        </select>
        <Link to="/profile/:id" type="button" className="text-decoration-none">
          Profile
        </Link>
        <Link to="/reguser" type="button" className="text-decoration-none">
          Register
        </Link>
      </div>
      <h1>Our Services</h1>
      <div className="grid-fluid">
        {allServices?.map((service) => {
          return (
            <div key={service.id} className="p-2">
              <Link
                to={`/service/${service.id}`}
                type="button"
                className="text-decoration-none"
              >
                <ServiceCard name={service.name} id={service.id} />
              </Link>
            </div>
          );
        })}
      </div>
      <h1>Our Professionals</h1>
      <div>
        <div className="grid-fluid">
          {allVets?.map((vet) => {
            return (
              <div key={vet.id} className="p-2">
                <Link
                  to={`/vet/${vet.id}`}
                  type="button"
                  className="text-decoration-none"
                >
                  <VetCard
                    image={vet.image}
                    name={vet.name}
                    lastname={vet.lastname}
                    id={vet.id}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
