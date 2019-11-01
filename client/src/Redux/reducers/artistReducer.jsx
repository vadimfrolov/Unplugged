import { TYPES } from '../actions/artistActions'

const initialState = {
  isSuccess: false,
  isLoading: false,
  id: '',
  name: '',
  bio: '',
  tags: [],
  similar: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.FETCH_ARTIST_ID_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false
      }
    }

    case TYPES.FETCH_ARTIST_ID_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        ...payload
      }
    }

    case TYPES.FETCH_ARTIST_ID_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      }
    }

    case TYPES.FETCH_ARTIST_INFO_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      }
    }

    case TYPES.FETCH_ARTIST_INFO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        ...payload
      }
    }

    case TYPES.FETCH_ARTIST_INFO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false
      }
    }

    default:
      return state;
  }
};
