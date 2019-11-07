import { TYPES } from './artistActions'

const initialState = {
  isSuccess: false,
  isLoading: false,
  id: '',
  name: '',
  bio: '',
  pic: '',
  tags: [],
  similar: [],
  tourSnippet: [],
  comments:[],
  isSearchBar: false,
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

    case TYPES.FETCH_TOUR_SNIPPET_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isSuccess: false
      }
    }

    case TYPES.FETCH_TOUR_SNIPPET_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        tourSnippet: payload
      }
    }

    case TYPES.FETCH_TOUR_SNIPPET_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      }
    }
    case TYPES.FETCH_ADD_COMMENT_ARTIST: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        comments:payload
      }
    }

    case TYPES.SWITCH_SEARCH_BAR: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isSearchBar: payload
      }
    }

    case TYPES.SWITCH_SEARCH_BAR: {
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isSearchBar: payload
      }
    }

    default:
      return state;
  }
};
