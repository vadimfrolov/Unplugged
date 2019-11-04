import { TYPES } from "../actions/userAuth";


const initialState = {
  user: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.SET_USER: {
      return {
        ...state,
        ...payload
      }
    }
    default:
      return state;
  }
}