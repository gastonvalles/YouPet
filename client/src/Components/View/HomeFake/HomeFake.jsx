import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVets, getServices } from "../../../Redux/actions";
import ServiceCard from "../../Functionality/Cards/ServiceCard";
import VetCard from "../../Functionality/Cards/VetCard";
import SearchBarHome from "../../Functionality/SearchBar/SearchBarHome";
import "./HomeFake.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVets = useSelector((state) => state.vets);
  const allServices = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(getVets());
    dispatch(getServices());
  }, [dispatch]);

  return (
    <div>
      <div className="grid-fluid">
        <Link to="/profile/:id" type="button" className="text-decoration-none">
          Profile
        </Link>
        <Link to="/reguser" type="button" className="text-decoration-none">
          Register
        </Link>
        <SearchBarHome/>
      </div>
      <h1>Our Services</h1>
      <div className="grid-fluid">
        {allServices?.map((service) => {
          return (
            <div key={service.id} className="p-2">
              <Link to={`/service/${service.id}`} type="button" className="text-decoration-none">
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
