import axios from "axios";
import get from "lodash.get";
import moment from "moment";

export const TYPES = {
  FETCH_UPCOMING_CONCERTS_REQUEST: 'FETCH_UPCOMING_CONCERTS_REQUEST',
  FETCH_UPCOMING_CONCERTS_SUCCESS: 'FETCH_UPCOMING_CONCERTS_SUCCESS',
  FETCH_UPCOMING_CONCERTS_FAILURE: 'FETCH_UPCOMING_CONCERTS_FAILURE',
  FETCH_CONCERTS_BY_DATE_REQUEST: 'FETCH_CONCERTS_BY_DATE_REQUEST',
  FETCH_CONCERTS_BY_DATE_SUCCESS: 'FETCH_CONCERTS_BY_DATE_SUCCESS',
  FETCH_CONCERTS_BY_DATE_FAILURE: 'FETCH_CONCERTS_BY_DATE_FAILURE',
}

export const fetchUpcomingConcertsAC = () => async dispatch => {
  dispatch({ type: TYPES.FETCH_UPCOMING_CONCERTS_REQUEST });

  try {
    const res = await axios.get('/explore');
    const data = get(res, "data.dataExplore.resultsPage.results.event", {});

    dispatch({
      type: TYPES.FETCH_UPCOMING_CONCERTS_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({ type: TYPES.FETCH_UPCOMING_CONCERTS_FAILURE });
    console.log(err);
  }
};

export const fetchConcertsByDateAC = (date) => async dispatch => {
  dispatch({ type: TYPES.FETCH_CONCERTS_BY_DATE_REQUEST });

  try {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const res = await axios.post(`/explore/${formattedDate}`, { formattedDate });
    const data = get(res, "data.dataDate.resultsPage.results.event", []);

    dispatch({
      type: TYPES.FETCH_CONCERTS_BY_DATE_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({ type: TYPES.FETCH_CONCERTS_BY_DATE_FAILURE });
    console.log(err);
  }
};