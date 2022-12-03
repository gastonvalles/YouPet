import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getServiceDetail, clearDetails } from "../../../../Redux/actions";
import { getVets } from "../../../../Redux/actions";

import VetCard from "../../Cards/VetCard";

function ChooseVetTurn() {
  const { servId } = useParams();
  const dispatch = useDispatch();

  const allVets = useSelector((state) => state.vets);
  const service = useSelector((state) => state.serviceDetail);

  const navigate = useNavigate();
  const path = `/service/${servId}`;

  useEffect(() => {
    if (!allVets?.length) {
      dispatch(getVets());
    }

    dispatch(getServiceDetail(servId));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, servId, allVets]);

  return (
    <div>
      <h1>Choose vet</h1>

      <div className="grid-fluid">
        {allVets?.map((vet) => {
          const vetSpeciality = vet.speciality.toLowerCase();
          const serviceType = service?.type?.toLowerCase();

          if (serviceType?.includes(vetSpeciality)) {
            return (
              <div key={vet.id} className="m-2">
                <Link
                  to={`${vet.id}/turn`}
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
          } else {
            return null;
          }
        })}
      </div>

      <button onClick={() => navigate(path)} className={"btn"}>
        Go back
      </button>
    </div>
  );
}

export default ChooseVetTurn;
