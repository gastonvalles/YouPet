import axios from "axios";
import {
  GET_PETS,
  GET_VETS,
  GET_VET_DETAIL,
  CLEAR_DETAILS,
  CREATE_TURN,
  GET_PET_DETAIL,
} from "./const";

export function getPets() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:5000/pets");
    return dispatch({
      type: GET_PETS,
      payload: json.data,
    });
  };
}

export function getPetDetail(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:5000/pets/${id}`);
    return dispatch({
      type: GET_PET_DETAIL,
      payload: json.data,
    });
  };
}

export function getVets() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:5000/vets");
    return dispatch({
      type: GET_VETS,
      payload: json.data,
    });
  };
}

export function getVetsDetail(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:5000/vets/${id}`);
    return dispatch({
      type: GET_VET_DETAIL,
      payload: json.data,
    });
  };
}

export function clearDetails() {
  return {
    type: CLEAR_DETAILS,
    payload: [],
  };
}

export function createTurn(payload) {
  return async function (dispatch) {
    let json = await axios.post("http://localhost", payload);
    return dispatch({
      type: CREATE_TURN,
      payload: json.data,
    });
  };
  }
}
