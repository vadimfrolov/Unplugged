import axios from "axios";
import get from "lodash.get";

export const TYPES = {
  FETCH_CONCERT_INFO_REQUEST: "FETCH_CONCERT_INFO_REQUEST",
  FETCH_CONCERT_INFO_SUCCESS: "FETCH_CONCERT_INFO_SUCCESS",
  FETCH_CONCERT_INFO_FAILURE: "FETCH_CONCERT_INFO_FAILURE",
  FETCH_ADD_COMMENTS: "FETCH_ADD_COMMENTS"
};

export const fetchConcertInfoAC = id => async dispatch => {
  dispatch({ type: TYPES.FETCH_CONCERT_INFO_REQUEST });

  try {
    const res = await axios.get(`/concert/${id}`, { id });
    const data = get(res, "data.info", {});
    const arrComment = get(res, "data.commentsConcert", []);
    // let comments = arrComment.sort((a, b) => {
    // return  b.date - a.date;
    // });
    // console.log("ppppppp", comments);

    dispatch({
      type: TYPES.FETCH_CONCERT_INFO_SUCCESS,
      payload: {
        ...data,
        comments: arrComment
      }
    });
  } catch (err) {
    dispatch({ type: TYPES.FETCH_CONCERT_INFO_FAILURE });
    console.log(err);
  }
};

export const fetchAddCommentAC = comment => async dispatch => {
  try {
    const res = await axios.post(`/comments`, { comment });
    const data = get(res, "data", {});
    dispatch({
      type: TYPES.FETCH_ADD_COMMENTS,
      payload: data.concerts.comments
    });
  } catch (err) {
    console.log(err);
  }
};
