import axios from "axios";
import get from "lodash.get";

export const TYPES = {
  FETCH_ARTIST_ID_REQUEST: "FETCH_ARTIST_ID_REQUEST",
  FETCH_ARTIST_ID_SUCCESS: "FETCH_ARTIST_ID_SUCCESS",
  FETCH_ARTIST_ID_FAILURE: "FETCH_ARTIST_ID_FAILURE",
  FETCH_ARTIST_INFO_REQUEST: "FETCH_ARTIST_INFO_REQUEST",
  FETCH_ARTIST_INFO_SUCCESS: "FETCH_ARTIST_INFO_SUCCESS",
  FETCH_ARTIST_INFO_FAILURE: "FETCH_ARTIST_INFO_FAILURE",
  FETCH_TOUR_SNIPPET_REQUEST: "FETCH_TOUR_SNIPPET_REQUEST",
  FETCH_TOUR_SNIPPET_SUCCESS: "FETCH_TOUR_SNIPPET_SUCCESS",
  FETCH_TOUR_SNIPPET_FAILURE: "FETCH_TOUR_SNIPPET_FAILURE",
  SWITCH_SEARCH_BAR: "SWITCH_SEARCH_BAR",
  FETCH_ADD_COMMENT_ARTIST: "FETCH_ADD_COMMENT_ARTIS",
  FETCH_DELETE_COMMENT_ARTIST: "FETCH_DELETE_COMMENT_ARTIST"
};

export const switchSearchBarAC = () => async dispatch => {
  dispatch({
    type: TYPES.SWITCH_SEARCH_BAR,
    payload: true
  });
};

export const fetchArtistIdAC = text => async dispatch => {
  dispatch({ type: TYPES.FETCH_ARTIST_ID_REQUEST });

  try {
    const { data } = await axios.post("/getId", { text });

    dispatch({
      type: TYPES.FETCH_ARTIST_ID_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({ type: TYPES.FETCH_ARTIST_ID_FAILURE });
    console.log(err);
  }
};

export const fetchArtistInfoAC = text => async dispatch => {
  dispatch({ type: TYPES.FETCH_ARTIST_INFO_REQUEST });

  try {
    const res = await axios.post("/search", { text });
    const artist = get(res, "data.dataSearch.artist", {});
    const pic = get(res, "data.pic.items[0].snippet.thumbnails.high.url", {});
    const topTracks = get(res, "data.dataSearch.topTracks", []);

    dispatch({
      type: TYPES.FETCH_ARTIST_INFO_SUCCESS,
      payload: {
        ...artist,
        pic: pic,
        tags: artist.tags.tag,
        similar: artist.similar.artist,
        topTracks: topTracks,
        comments: res.data.artistComment
      }
    });
  } catch (err) {
    dispatch({ type: TYPES.FETCH_ARTIST_INFO_FAILURE });
    console.log(err);
  }
};

export const fetchArtistConcertAC = id => async dispatch => {
  dispatch({ type: TYPES.FETCH_TOUR_SNIPPET_REQUEST });

  try {
    const res = await axios.get(`/artists/${id}`, { id });
    const tourSnippet = get(
      res,
      "data.dataConcerts.resultsPage.results.event",
      []
    );

    dispatch({
      type: TYPES.FETCH_TOUR_SNIPPET_SUCCESS,
      payload: tourSnippet
    });
  } catch (err) {
    dispatch({ type: TYPES.FETCH_TOUR_SNIPPET_FAILURE });
    console.log(err);
  }
};

/// ADD коментарии
export const fetchAddCommentArtistAC = comment => async dispatch => {
  try {
    const res = await axios.post(`/commentsar`, { comment });
    const data = get(res, "data", {});
    const sortComments = data.commentsArtist.comments.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    dispatch({
      type: TYPES.FETCH_ADD_COMMENT_ARTIST,
      payload: sortComments
    });
  } catch (err) {
    console.log(err);
  }
};

//DELETE COMMENT

export const fetchDeleteCommentArtistAC = (
  id,
  idArtist
) => async dispatch => {
  try {
    const res = await axios.post(`/delete/${id}/${idArtist}`, {
      id,
      idArtist
    });
    const data = get(res, "data", {});
    const sortComments=data.commentsArtist.comments.sort((a,b)=>{
      return new Date(b.date)-new Date(a.date)
    })
    dispatch({
      type: TYPES.FETCH_DELETE_COMMENT_ARTIST,
      payload: sortComments
    });
  } catch (err) {
    console.log(err);
  }
};
