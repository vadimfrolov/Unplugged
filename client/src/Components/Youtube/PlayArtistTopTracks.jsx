import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { playTrackFromListAC, youtubePlayerPlayPauseAC } from "../../Redux/youtubeReducer/youtubeActions";
import axios from "axios";
import get from "lodash.get";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

const youTubeApikey = process.env.REACT_APP_YOUTUBE_API_KEY;

class ArtistTrack extends Component {
  playButtonClick = async () => {
    const { artist } = this.props;
    const response = await axios.post("/search", { text: artist });
    const topTracks = get(response, "data.dataSearch.topTracks", []);
    const trackName = topTracks[0].name;
    const query = encodeURIComponent(`${artist} ${trackName}`);
    const httpQuery = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${query}&key=${youTubeApikey}`;
    const res = await axios.get(httpQuery);

    const videoId = get(res, "data.items[0].id.videoId", "dQw4w9WgXcQ");
    const url = `https://www.youtube.com/watch?v=${videoId}`;

    const trackNum = 0;

    await this.props.playTrackFromList(url, trackNum, topTracks);
    this.props.youtubePlayerPlayPause(true);
  };

  render() {
    return (
      <div style={{display: 'inline'}}>
        {this.props.concertPage && (
          <IconButton onClick={this.playButtonClick} fontSize="large" color="secondary">
            <PlayArrowIcon color="secondary" fontSize="large" />
          </IconButton>
        )}

        {this.props.artistPage && (
          <div>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<PlayArrowIcon />}
            >
              Play Artist
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  playing: store.youtube.playing
});

const mapDispatchToProps = dispatch => ({
  youtubePlayerPlayPause: playingToggle =>
    dispatch(youtubePlayerPlayPauseAC(playingToggle)),
  playTrackFromList: (url, trackNum, topTracks) =>
    dispatch(playTrackFromListAC(url, trackNum, topTracks))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ArtistTrack));
