import axios from "axios";

import {
  CLEAR_DETAILS,
  CLEAR_TURN,
  CREATE_TURN,
  FILTER_SERVICE,
  GET_MYUSER,
  GET_ADMINS,
  GET_ADMIN_BY_NAME,
  GET_ADMIN_DETAIL,
  GET_PETS,
  GET_PET_DETAIL,
  GET_SERVICES,
  GET_SERVICE_BY_NAME,
  GET_SERVICE_DETAIL,
  GET_TURN,
  GET_USERS,
  GET_USER_BY_EMAIL,
  GET_USER_BY_NAME,
  GET_USER_DETAIL,
  GET_VETS,
  GET_VET_BY_NAME,
  GET_VET_DETAIL,
} from "./const";
const instance = axios.create({
  baseURL: "http://localhost:3001",
});
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function getPets() {
  return async function (dispatch) {
    let json = await instance.get("/pet");
    return dispatch({
      type: GET_PETS,
      payload: json.data,
    });
  };
}

export function getPetDetail(id) {
  return async function (dispatch) {
    let json = await instance.get(`/pet/${id}`);
    return dispatch({
      type: GET_PET_DETAIL,
      payload: json.data,
    });
  };
}

export function getVets() {
  return async function (dispatch) {
    let json = await instance.get("/vet");
    return dispatch({
      type: GET_VETS,
      payload: json.data,
    });
  };
}

export function getVetsDetail(id) {
  return async function (dispatch) {
    let json = await instance.get(`/vet/${id}`);
    return dispatch({
      type: GET_VET_DETAIL,
      payload: json.data,
    });
  };
}
export function getVetByName(name) {
  return async function (dispatch) {
    let json = await instance.get(`/vet?name=${name}`);
    return dispatch({
      type: GET_VET_BY_NAME,
      payload: json.data,
    });
  };
}

export function getServices() {
  return async function (dispatch) {
    let json = await instance.get("/service");
    return dispatch({
      type: GET_SERVICES,
      payload: json.data,
    });
  };
}

export function getServiceByName(name) {
  return async function (dispatch) {
    let json = await instance.get(`/service?name=${name}`);
    return dispatch({
      type: GET_SERVICE_BY_NAME,
      payload: json.data,
    });
  };
}

export function getServiceDetail(id) {
  return async function (dispatch) {
    let json = await instance.get(`/service/${id}`);
    return dispatch({
      type: GET_SERVICE_DETAIL,
      payload: json.data,
    });
  };
}

export function getUsers() {
  return async function (dispatch) {
    let json = await instance.get("/user");
    return dispatch({
      type: GET_USERS,
      payload: json.data,
    });
  };
}
export function getMyUser() {
  return async function (dispatch) {
    let json = await instance.get("/user/myuser");
    return dispatch({
      type: GET_MYUSER,
      payload: json.data,
    });
  };
}

export function getUserDetail(id) {
  return async function (dispatch) {
    let json = await instance.get(`/user/${id}`);
    return dispatch({
      type: GET_USER_DETAIL,
      payload: json.data,
    });
  };
}

export function getUserByName(name) {
  return async function (dispatch) {
    let json = await instance.get(`/user?name=${name}`);
    return dispatch({
      type: GET_USER_BY_NAME,
      payload: json.data,
    });
  };
}

export function getUserByEmail(email) {
  return async function (dispatch) {
    let json = await instance.get(`/user/log/${email}`);
    return dispatch({
      type: GET_USER_BY_EMAIL,
      payload: json.data,
    });
  };
}

export function getAdmins() {
  return async function (dispatch) {
    let json = await instance.get("/admin");
    return dispatch({
      type: GET_ADMINS,
      payload: json.data,
    });
  };
}

export function getAdminDetail(id) {
  return async function (dispatch) {
    let json = await instance.get(`/admin/${id}`);
    return dispatch({
      type: GET_ADMIN_DETAIL,
      payload: json.data,
    });
  };
}
export function getAdminByName(name) {
  return async function (dispatch) {
    let json = await instance.get(`/admin?name=${name}`);
    return dispatch({
      type: GET_ADMIN_BY_NAME,
      payload: json.data,
    });
  };
}

export function createTurn(payload) {
  return async function (dispatch) {
    let json = await instance.post("/turn", payload);
    return dispatch({
      type: CREATE_TURN,
      payload: json.data,
    });
  };
}

export function getTurn(payload) {
  const { vetSelect, servId } = payload;
  return async function (dispatch) {
    let json = await instance.get(`/turn/${vetSelect}/${servId}`);
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

export function filterService(payload) {
  return {
    type: FILTER_SERVICE,
    payload,
  };
}

// export function filterVets(payload) {
//   return {
//     type: FILTER_VETS,
//     payload
//   };
// }
