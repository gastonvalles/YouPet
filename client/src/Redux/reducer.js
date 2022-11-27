import {
  CLEAR_DETAILS,
  GET_PETS,
  GET_VETS,
  GET_VET_DETAIL,
  CREATE_TURN,
  GET_PET_DETAIL,
  GET_SERVICES,
  GET_SERVICE_DETAIL,
  GET_USERS,
  GET_USER_DETAIL,
  GET_ADMINS,
  GET_ADMIN_DETAIL,
  FILTER_SERVICE,
} from "./const";

const initialState = {
  pets: [],
  vets: [],
  medDiag: [],
  vetDetail: [],
  petDetail: [],
  turn: [],
  services: [],
  serviceDetail: [],
  users: [],
  userDetail: [],
  admins: [],
  adminDetail: [],
  filterService: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PETS:
      return {
        ...state,
        pets: action.payload,
      };
    case GET_PET_DETAIL:
      return {
        ...state,
        petDetail: action.payload,
      };

    case FILTER_SERVICE:
      const service = state.services;
      const filter =
        action.payload === ""
          ? service
          : service.filter(
              (r) => r.type.toLowerCase() === action.payload.toLowerCase()
            );
      return {
        ...state,
        filterService: filter,
      };
    case GET_VETS:
      return {
        ...state,
        vets: action.payload,
      };
    case GET_VET_DETAIL:
      return {
        ...state,
        vetDetail: action.payload,
      };
    case GET_SERVICES:
      return {
        ...state,
        services: action.payload,
        filterService: action.payload,
      };
    case GET_SERVICE_DETAIL:
      return {
        ...state,
        serviceDetail: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER_DETAIL:
      return {
        ...state,
        userDetail: action.payload,
      };
    case GET_ADMINS:
      return {
        ...state,
        admins: action.payload,
      };
    case GET_ADMIN_DETAIL:
      return {
        ...state,
        admins: action.payload,
      };

    case CLEAR_DETAILS:
      return {
        ...state,
        vetDetail: [],
        petDetail: [],
        serviceDetail: [],
        userDetail: [],
      };
    case CREATE_TURN:
      return {
        ...state,
        turn: [...state.turn, action.payload],
      };
    default:
      return state;
  }
}

export default rootReducer;
