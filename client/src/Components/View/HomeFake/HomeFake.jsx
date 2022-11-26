import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getVets } from "../../../Redux/actions";
import VetCard from "../../Functionality/Cards/VetCard";
import "./HomeFake.css"

export default function Home() {
  const dispatch = useDispatch();
  const allVets = useSelector((state) => state.vets);

  useEffect(() => {
    dispatch(getVets());
  }, [dispatch]);

  return (
    <div>
      <div>
        <Link to="/profile/:id" type="button" className="text-decoration-none">
          Profile
        </Link>
      </div>
      <h1>Our Professionals</h1>
      <div>
        <div className="grid-fluid">
        {allVets?.map((vet) => {
          return (
            <div key={vet.id}>
              <Link
                to={`/${vet.id}`}
                type="button"
                className="text-decoration-none"
              >
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
    </div>
  );
}
