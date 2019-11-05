import axios from "axios";
import get from "lodash.get";

export const TYPES = {
  FETCH_CONCERT_INFO_REQUEST: 'FETCH_CONCERT_INFO_REQUEST',
  FETCH_CONCERT_INFO_SUCCESS: 'FETCH_CONCERT_INFO_SUCCESS',
  FETCH_CONCERT_INFO_FAILURE: 'FETCH_CONCERT_INFO_FAILURE',
}

export const fetchConcertInfoAC = (id) => async dispatch => {
  dispatch({ type: TYPES.FETCH_CONCERT_INFO_REQUEST });

  try {
    const res = await axios.get(`/concert/${id}`, {id});
    const data = get(res, "data.info", {});

    dispatch({
      type: TYPES.FETCH_CONCERT_INFO_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({ type: TYPES.FETCH_CONCERT_INFO_FAILURE });
    console.log(err);
  }
};


