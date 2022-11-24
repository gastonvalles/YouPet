import React from 'react';

export default function VetCard({name, lastName, speciality, score, reviews}){

  return (
    <div>
      <div>
        <h1>Name: {name}</h1>
        <h1>Last Name: {lastName}</h1>
        <h4>Specialities: {speciality}</h4>
        <div>
          <h4>Score: {score}</h4>
          <h4>Reviews: {reviews}</h4>
        </div>
      </div>
    </div>
  )
}