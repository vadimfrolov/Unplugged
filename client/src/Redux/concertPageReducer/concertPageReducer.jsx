import { TYPES } from "./concertPageActions";

const initialState = {
  isSuccess: false,
  isLoading: false,
  id: "",
  name: "",
  date: "",
  time: "",
  venue: "",
  performers: [],
  comments: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.FETCH_CONCERT_INFO_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false
      };
    }

    case TYPES.FETCH_CONCERT_INFO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        ...payload
      };
    }

    case TYPES.FETCH_CONCERT_INFO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false
      };
    }

    case TYPES.FETCH_ADD_COMMENTS: {

      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        comments: payload
      };
    }
    default:
      return state;
  }
};
