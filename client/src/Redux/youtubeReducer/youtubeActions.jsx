import { TYPES } from "./youtubeTypes";

const playTrackFromListAC = (url, trackNum, topTracks) => {
  return {
    type: TYPES.PLAY_TRACK_FROM_LIST,
    payload: {
      url: url,
      playing: true,
      played: 0,
      loaded: 0,
      pip: false,
      trackNum: trackNum,
      topTracks: topTracks,
      playerWindow: true,
    }
  };
};

const youtubePlayerCloseAC = () => {
  return {
    type: TYPES.PLAYER_CLOSE,
    payload: {
      playing: false,
      played: 0,
      loaded: 0,
      pip: false,
      playerWindow: false,
    }
  };
};

const youtubePlayerPlayPauseAC = playingToggle => {
  return {
    type: TYPES.PLAYER_PLAY_PAUSE,
    payload: {
      playing: playingToggle,
      playerWindow: true,
    }
  };
};

const youtubePlayerChangeTrackAC = (url, trackNum) => {
  return {
    type: TYPES.PLAYER_CHANGE_TRACK,
    payload: {
      url: url,
      playing: true,
      played: 0,
      loaded: 0,
      pip: false,
      trackNum: trackNum,
      playerWindow: true,
    }
  };
};

export {
  playTrackFromListAC,
  youtubePlayerCloseAC,
  youtubePlayerPlayPauseAC,
  youtubePlayerChangeTrackAC,
};
