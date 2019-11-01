const initialState = {
  artist: { id: '', name: '', bio: '', tags: [], similar: [] }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ARTIST_ID': {
      return {
        ...state,
        artist: { ...state.artist, id: action.id }
      };
    }
    case 'GET_ARTIST_INFO': {
      return {
        ...state,
        artist: { ...state.artist, ...action.artist }
      };
    }
    default:
      return state;
  }
}
