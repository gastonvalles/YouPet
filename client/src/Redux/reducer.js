import { CLEAR_DETAILS, GET_PETS, GET_VETS, GET_VET_DETAIL } from "./const";

const initialState = {
  pets: [],
  vets: [],
  medDiag: [],
  vetDetail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PETS:
      return {
        ...state,
        pets: action.payload
      }
    case GET_VETS:
      return {
        ...state,
        vets: action.payload
      }
    case GET_VET_DETAIL:
      return {
        ...state,
        vetDetail: action.payload
      }
    case CLEAR_DETAILS:
      return {
        ...state,
        vetDetail: []
      }

    default:
      return state;
  }
}

export default rootReducer;
