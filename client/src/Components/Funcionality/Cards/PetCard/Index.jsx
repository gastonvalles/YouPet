import React from "react";
import {useSelector} from 'react-redux';
import MedicalDiagnostic from "../MedDiag";

export default function PetCard({
  name,
  species,
  description,
}) {
  const alldignostics = useSelector(state=> state.medDiag)
  return (
    <div>
      <div>
        <h1>Name: {name}</h1>
        <h4>Species: {species}</h4>
        <h4>Description: {description}</h4>
      </div>
      <div>
        <h4>Medical Diagnostic:</h4>
        {
          alldignostics?.map(diagnostic=> {
            return (
              <div>
                <MedicalDiagnostic detail={diagnostic.detail} date={diagnostic.date}/>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
