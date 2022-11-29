import axios from "axios";
import {
  GET_PETS,
  GET_VETS,
  GET_VET_DETAIL,
  CLEAR_DETAILS,
  CREATE_TURN,
  GET_TURN,
  GET_PET_DETAIL,
  GET_SERVICES,
  GET_SERVICE_DETAIL,
  GET_USERS,
  GET_USER_DETAIL,
  GET_USER_BY_NAME,
  GET_USER_BY_EMAIL,
  GET_ADMINS,
  GET_ADMIN_DETAIL,
  GET_SERVICE_BY_NAME,
  GET_VET_BY_NAME,
  GET_ADMIN_BY_NAME,
  CLEAR_TURN,
} from "./const";

export function getPets() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/pet");
    return dispatch({
      type: GET_PETS,
      payload: json.data,
    });
  };
}

export function getPetDetail(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/pet/${id}`);
    return dispatch({
      type: GET_PET_DETAIL,
      payload: json.data,
    });
  };
}

export function getVets() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/vet");
    return dispatch({
      type: GET_VETS,
      payload: json.data,
    });
  };
}

export function getVetsDetail(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/vet/${id}`);
    return dispatch({
      type: GET_VET_DETAIL,
      payload: json.data,
    });
  };
}
export function getVetByName(name) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/vet?name=${name}`);
    return dispatch({
      type: GET_VET_BY_NAME,
      payload: json.data,
    });
  };
}

export function getServices() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/service");
    return dispatch({
      type: GET_SERVICES,
      payload: json.data,
    });
  };
}

export function getServiceByName(name) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/service?name=${name}`);
    return dispatch({
      type: GET_SERVICE_BY_NAME,
      payload: json.data,
    });
  };
}

export function getServiceDetail(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/service/${id}`);
    return dispatch({
      type: GET_SERVICE_DETAIL,
      payload: json.data,
    });
  };
}

export function getUsers() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/user");
    return dispatch({
      type: GET_USERS,
      payload: json.data,
    });
  };
}

export function getUserDetail(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/user/${id}`);
    return dispatch({
      type: GET_USER_DETAIL,
      payload: json.data,
    });
  };
}

export function getUserByName(name) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/user?name=${name}`);
    return dispatch({
      type: GET_USER_BY_NAME,
      payload: json.data,
    });
  };
}

export function getUserByEmail(email) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/user/log/${email}`);
    return dispatch({
      type: GET_USER_BY_EMAIL,
      payload: json.data,
    });
  };
}

export function getAdmins() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/admin");
    return dispatch({
      type: GET_ADMINS,
      payload: json.data,
    });
  };
}

export function getAdminDetail(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/admin/${id}`);
    return dispatch({
      type: GET_ADMIN_DETAIL,
      payload: json.data,
    });
  };
}
export function getAdminByName(name) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/admin?name=${name}`);
    return dispatch({
      type: GET_ADMIN_BY_NAME,
      payload: json.data,
    });
  };
}

export function createTurn(payload) {
  return async function (dispatch) {
    let json = await axios.post("http://localhost:3001/turn", payload);
    return dispatch({
      type: CREATE_TURN,
      payload: json.data,
    });
  };
}

export function getTurn(payload) {
  const {vetId, servId } = payload;
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/turn/${vetId}/${servId}`);
    return dispatch({
      type: GET_TURN,
      payload: json.data,
    });
  };
}

export function clearTurn() {
  return {
    type: CLEAR_TURN,
    payload: [],
  };
}

export function clearDetails() {
  return {
    type: CLEAR_DETAILS,
    payload: [],
  };
}

