import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getVets } from "../../Redux/actions";
import VetCard from "../Functionality/Cards/VetCard/Index";

export default function Home() {
  const dispatch = useDispatch();
  const allVets = useSelector((state) => state.vets);

  useEffect(() => {
    dispatch(getVets());
  }, [dispatch]);

  return (
    <div>
      <h1>Our Professionals</h1>
      <div className="row">
        {allVets?.map((vet) => {
          return (
            <div key={vet.id} className="col-lg-6">
              <Link to={`/${vet.id}`} type= "button" className="text-decoration-none">
                <VetCard
                  image={vet.image}
                  name={vet.name}
                  lastName={vet.lastName}
                  id={vet.id}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
