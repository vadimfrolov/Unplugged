import axios from 'axios';
import get from 'lodash.get';

export const TYPES = {
  FETCH_ARTIST_ID_REQUEST: 'FETCH_ARTIST_ID_REQUEST',
  FETCH_ARTIST_ID_SUCCESS: 'FETCH_ARTIST_ID_SUCCESS',
  FETCH_ARTIST_ID_FAILURE: 'FETCH_ARTIST_ID_FAILURE',
  FETCH_ARTIST_INFO_REQUEST: 'FETCH_ARTIST_INFO_REQUEST',
  FETCH_ARTIST_INFO_SUCCESS: 'FETCH_ARTIST_INFO_SUCCESS',
  FETCH_ARTIST_INFO_FAILURE: 'FETCH_ARTIST_INFO_FAILURE'
}

export const fetchArtistIdAC = (text) => async dispatch => {
  dispatch({ type: TYPES.FETCH_ARTIST_ID_REQUEST });

  try {
    const { data } = await axios.post("/getId", { text });

    dispatch({
      type: TYPES.FETCH_ARTIST_ID_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({ type: TYPES.FETCH_ARTIST_ID_FAILURE })
    console.log(err);
  }
}

export const fetchArtistInfoAC = text => async dispatch => {
  dispatch({ type: TYPES.FETCH_ARTIST_INFO_REQUEST });

  try {
    const res = await axios.post('/search', { text });
    const artist = get(res, 'data.dataSearch.artist', {});

    dispatch({
      type: TYPES.FETCH_ARTIST_INFO_SUCCESS,
      payload: {
        ...artist,
        tags: artist.tags.tag
      },
    });
  } catch (err) {
    dispatch({ type: TYPES.FETCH_ARTIST_INFO_FAILURE });
    console.log(err);
  }
}
