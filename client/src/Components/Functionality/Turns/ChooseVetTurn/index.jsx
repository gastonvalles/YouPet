import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getServiceDetail, clearDetails } from "../../../../Redux/actions";
import { getVets } from "../../../../Redux/actions";

import TakeTurn from "../TakeTurn/index";

import ChooseVetStyle from "./choosevet.module.css";

function ChooseVetTurn() {
  const { servId } = useParams();
  const dispatch = useDispatch();

  const [vetSelect, setVetSelect] = useState("none");
  const [updateCalendar, setUpdateCalendar] = useState(false);

  const allVets = useSelector((state) => state.vets);
  const service = useSelector((state) => state.serviceDetail);

  useEffect(() => {
    if (!allVets?.length) {
      dispatch(getVets());
    }

    dispatch(getServiceDetail(servId));
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, servId, allVets]);



  const handleSelectChange = (e) => {
    setVetSelect(e.target.value);
    setUpdateCalendar(true)
  };

  return (
    <div className={ChooseVetStyle.container}>
      <div className="d-flex flex-column ">
        <h1>Choose vet</h1>

        <select
          name="vets"
          className={"form-select " + ChooseVetStyle.select}
          value={vetSelect}
          onChange={(e) => {
            handleSelectChange(e);
          }}
        >
          <option key={"noneVet"} value={"none"}>
            none
          </option>
          {allVets?.map((vet) => {
            const vetSpeciality = vet.speciality.toLowerCase();
            const serviceType = service?.type?.toLowerCase();

            if (serviceType?.includes(vetSpeciality)) {
              return (
                <option key={vet.id} value={vet.id}>
                  {vet.name} {vet.lastname}
                </option>

                // <div key={vet.id} className="m-2">
                //     <VetCard
                //       image={vet.image}
                //       name={vet.name}
                //       lastname={vet.lastname}
                //       id={vet.id}
                //     />
                // </div>
              );
            } else {
              return null;
            }
          })}
        </select>
      </div>

      <div>
        <TakeTurn
          vetSelect={vetSelect}
          updateCalendar={updateCalendar}
          setUpdateCalendar={setUpdateCalendar}
        />
      </div>
    </div>
  );
}

export default ChooseVetTurn;
