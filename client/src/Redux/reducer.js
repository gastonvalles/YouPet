import { CLEAR_DETAILS, GET_PETS, GET_VETS, GET_VET_DETAIL, CREATE_TURN, GET_PET_DETAIL } from "./const";

const initialState = {
  pets: [],
  vets: [],
  medDiag: [],
  vetDetail: [],
  petDetail: [],
  turn: [],
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
    case GET_PET_DETAIL:
      return {
        ...state,
        petDetail: action.payload
      }
    case CLEAR_DETAILS:
      return {
        ...state,
        vetDetail: [],
        petDetail: []
      }
    case CREATE_TURN:
      return {
        ...state,
        turn: [...state.turn, action.payload]
      }

    default:
      return state;
  }
}

export default rootReducer;
