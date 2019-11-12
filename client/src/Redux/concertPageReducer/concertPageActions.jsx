import axios from "axios";
import get from "lodash.get";

export const TYPES = {
  FETCH_CONCERT_INFO_REQUEST: "FETCH_CONCERT_INFO_REQUEST",
  FETCH_CONCERT_INFO_SUCCESS: "FETCH_CONCERT_INFO_SUCCESS",
  FETCH_CONCERT_INFO_FAILURE: "FETCH_CONCERT_INFO_FAILURE",
  FETCH_ADD_COMMENTS: "FETCH_ADD_COMMENTS",
  FETCH_DELETE_COMMENT_CONCERT: "FETCH_DELETE_COMMENT_CONCERT"
};


export const fetchConcertInfoAC = id => async dispatch => {
  dispatch({ type: TYPES.FETCH_CONCERT_INFO_REQUEST });

  try {
    const res = await axios.get(`/concert/${id}`, { id });
    const data = get(res, "data.info", {});
    const arrComment = get(res, "data.commentsConcert", []);

    const commentsSort = arrComment.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    dispatch({
      type: TYPES.FETCH_CONCERT_INFO_SUCCESS,
      payload: {
        ...data,
        comments: commentsSort
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

    const commentsSort = data.concerts.comments.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    dispatch({
      type: TYPES.FETCH_ADD_COMMENTS,
      payload: commentsSort
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchDeleteCommentConcertAC = (id, idConcert) => async dispatch => {
  try {
    const res = await axios.post(`/remove/${id}/${idConcert}`, { id, idConcert });
    const data = get(res, "data.commentsConcert.comments", {});

    const sortComments = data.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
    dispatch({
      type: TYPES.FETCH_DELETE_COMMENT_CONCERT,
      payload: sortComments
    });
  } catch (err) {
    console.log(err);
  }
};
