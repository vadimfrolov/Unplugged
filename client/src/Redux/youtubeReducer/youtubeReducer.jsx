import { TYPES } from "./youtubeTypes";

const initialState = {
  url: null,
  pip: false,
  playing: false,
  controls: true,
  volume: 1,
  muted: false,
  played: 0,
  loaded: 0,
  duration: 0,
  findInput: "",
  playerWindow: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.PLAY_TRACK_FROM_LIST: {
      return {
        ...state,
        ...payload
      };
    }

    case TYPES.PLAYER_CLOSE: {
      return {
        ...state,
        ...payload
      };
    }

    case TYPES.PLAYER_PLAY_PAUSE: {
      return {
        ...state,
        ...payload
      };
    }

    case TYPES.PLAYER_CHANGE_TRACK: {
      return {
        ...state,
        ...payload
      };
    }

    default:
      return state;
  }
};
