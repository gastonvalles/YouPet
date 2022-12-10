import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPets, clearDetails, getUserDetail, getAdminDetail } from "../../../../Redux/actions";
import PetCard from "../../Cards/PetCard";

export default function Profile() {
  const {id} = useParams()
  const dispatch = useDispatch();
  const user = useSelector(state => state.userDetail);
  const allPets = useSelector((state) => state.pets);

  useEffect(() => {
    dispatch(getUserDetail(id))
    dispatch(getAdminDetail(id))
    dispatch(getPets());
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, id]);

  return (
      <div>
        <div>
          <Link
            to="/"
            type="button"
            className="text-decoration-none btn btn-dark"
          >
            Home
          </Link>
          <Link
           to="/pet/register"
           type="button"
           className="text-decoration-none"
           >
            Pet Register
           </Link>
        </div>
        <div>
          <h1>My Profile</h1>
          <div className="grid-fluid">
            <h2>Full name: {user.name} {user.lastname}</h2>
            <h4>DNI: {user.dni}</h4>
            <h4>E-mail: {user.email}</h4>
            <h4>Addres: {user.address}</h4>
          </div>
        </div>
        <div className="row">
          <h1>Your Pets</h1>
          {allPets?.map((pet) => {
            return (
              <div key={pet.id} className="col-lg-3">
                <Link
                  to={`/pet/${pet.id}`}
                  type="button"
                  className="text-decoration-none"
                >
                  <PetCard name={pet.name} species={pet.species} id={pet.id} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
}
