import { TYPES } from './ConcertExploreActions'

const initialState = {
  isSuccess: false,
  isLoading: false,
  allEvents: null,
  dateEvents: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.FETCH_UPCOMING_CONCERTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false
      }
    }

    case TYPES.FETCH_UPCOMING_CONCERTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        allEvents: payload
      }
    }

    case TYPES.FETCH_UPCOMING_CONCERTS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      }
    }

    case TYPES.FETCH_CONCERTS_BY_DATE_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false
      }
    }

    case TYPES.FETCH_CONCERTS_BY_DATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        dateEvents: payload
      }
    }

    case TYPES.FETCH_CONCERTS_BY_DATE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      }
    }

    default:
      return state;
  }
};
