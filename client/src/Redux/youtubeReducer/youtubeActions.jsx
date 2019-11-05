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
      topTracks: topTracks
    }
  };
};

const youtubePlayerCloseAC = () => {
  return {
    type: TYPES.PLAYER_CLOSE,
    payload: {
      url: null,
      playing: true,
      played: 0,
      loaded: 0,
      pip: false,
      trackNum: null,
      topTracks: null
    }
  };
};

const youtubePlayerPlayPauseAC = playingToggle => {
  return {
    type: TYPES.PLAYER_PLAY_PAUSE,
    payload: {
      playing: playingToggle
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
      trackNum: trackNum
    }
  };
};

export {
  playTrackFromListAC,
  youtubePlayerCloseAC,
  youtubePlayerPlayPauseAC,
  youtubePlayerChangeTrackAC,
};
