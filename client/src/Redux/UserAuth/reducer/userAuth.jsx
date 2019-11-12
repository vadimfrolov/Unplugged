import { TYPES } from "../actions/userAuth";

const initialState = {
  isSuccess: false,
  isLoading: false,
  user: null
}


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.FETCH_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false
      }
    }

    case TYPES.SET_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: payload
      }
    }

    case TYPES.FETCH_USER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      }
    }
    default:
      return state;
  }
}
