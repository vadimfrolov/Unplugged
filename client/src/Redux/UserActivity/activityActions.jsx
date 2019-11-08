import axios from "axios";
import get from "lodash.get";

export const TYPES = {
  SET_USER_SUCCESS: "SET_USER_SUCCESS",
  FETCH_USER_REQUEST: "FETCH_USER_REQUEST",
  FETCH_USER_FAILURE: "FETCH_USER_FAILURE"
};

export const setUserAC = user => {
  return {
    type: TYPES.SET_USER_SUCCESS,
    payload: user
  };
};

export const previousConcertAC = (data, id) => async dispatch => {
  dispatch({ type: TYPES.FETCH_USER_REQUEST });

  try {
    const response = await axios.patch(
      `/useractivity/concert/previous/add/${id}`,
      { data }
    );
    const user = await get(response, "data");
    dispatch(setUserAC(user));
  } catch (err) {
    dispatch({ type: TYPES.FETCH_USER_FAILURE });
    console.log(err);
  }
};

export const upcomingConcertAC = (data, id) => async dispatch => {
  dispatch({ type: TYPES.FETCH_USER_REQUEST });

  try {
    const response = await axios.patch(
      `/useractivity/concert/upcoming/add/${id}`,
      { data }
    );
    const user = await get(response, "data");
    console.log(user);

    dispatch(setUserAC(user));
  } catch (err) {
    dispatch({ type: TYPES.FETCH_USER_FAILURE });
    console.log(err);
  }
};

export const upcomingConcertCancelAC = (data, id) => async dispatch => {
  dispatch({ type: TYPES.FETCH_USER_REQUEST });

  try {
    const response = await axios.patch(
      `/useractivity/concert/upcoming/cancel/${id}`,
      { user: data }
    );
    const user = await get(response, "data");
    dispatch(setUserAC(user));
  } catch (err) {
    dispatch({ type: TYPES.FETCH_USER_FAILURE });
    console.log(err);
  }
};

export const previousConcertRemoveAC = (data, id) => async dispatch => {
  dispatch({ type: TYPES.FETCH_USER_REQUEST });

  try {
    const response = await axios.patch(
      `/useractivity/concert/previous/remove/${id}`,
      { user: data }
    );
    const user = await get(response, "data");
    dispatch(setUserAC(user));
  } catch (err) {
    dispatch({ type: TYPES.FETCH_USER_FAILURE });
    console.log(err);
  }
};

export const addToFavoriteAC = (data, id) => async dispatch => {
  dispatch({ type: TYPES.FETCH_USER_REQUEST });

  try {
    const response = await axios.patch(
      `/useractivity/artist/favorite/add/${id}`,
      { user: data }
    );
    const user = await get(response, "data");
    console.log(user);

    dispatch(setUserAC(user));
  } catch (err) {
    dispatch({ type: TYPES.FETCH_USER_FAILURE });
    console.log(err);
  }
};

export const removeFavoriteAC = (data, id) => async dispatch => {
  dispatch({ type: TYPES.FETCH_USER_REQUEST });

  try {
    const response = await axios.patch(
      `/useractivity/artist/favorite/remove/${id}`,
      { user: data }
    );
    const user = await get(response, "data");
    console.log(user);

    dispatch(setUserAC(user));
  } catch (err) {
    dispatch({ type: TYPES.FETCH_USER_FAILURE });
    console.log(err);
  }
};
