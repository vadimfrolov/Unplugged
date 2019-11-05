import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { playTrackFromListAC } from "../../Redux/youtubeReducer/youtubeActions";
import axios from "axios";
import get from "lodash.get";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import IconButton from "@material-ui/core/IconButton";

const youTubeApikey = process.env.REACT_APP_YOUTUBE_API_KEY_SECOND;

class ArtistTrack extends Component {
  playButtonClick = async () => {
    const { artist, trackName } = this.props;
    const query = encodeURIComponent(`${artist} ${trackName}`);
    const httpQuery = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${query}&key=${youTubeApikey}`;
    const res = await axios.get(httpQuery);

    const videoId = get(res, "data.items[0].id.videoId", "dQw4w9WgXcQ");
    const url = `https://www.youtube.com/watch?v=${videoId}`;

    this.props.playTrackFromList(
      url,
      this.props.trackNum,
      this.props.topTracks
    );
  };

  render() {
    return (
      <div>
        <IconButton onClick={this.playButtonClick}>
          <PlayArrowIcon />
        </IconButton>
        <span>{`${this.props.trackNum + 1} - ${this.props.trackName}`}</span>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  playing: store.youtube.playing
});

const mapDispatchToProps = dispatch => ({
  playTrackFromList: (url, trackNum, topTracks) =>
    dispatch(playTrackFromListAC(url, trackNum, topTracks))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ArtistTrack));
