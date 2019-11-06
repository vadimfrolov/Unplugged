import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import screenfull from "screenfull";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import get from "lodash.get";
// import { hot } from "react-hot-loader";
// import { playTrackFromListAC } from "../../Redux/youtubeReducer/youtubeActions";
import {
  youtubePlayerCloseAC,
  youtubePlayerPlayPauseAC,
  youtubePlayerChangeTrackAC,
} from "../../Redux/youtubeReducer/youtubeActions";

import "./reset.css";
import "./defaults.css";
import "./App.css";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import PlayCircleOutlineOutlinedIcon from "@material-ui/icons/PlayCircleOutlineOutlined";
import PauseCircleOutlineOutlinedIcon from "@material-ui/icons/PauseCircleOutlineOutlined";
import FastForwardOutlinedIcon from "@material-ui/icons/FastForwardOutlined";
import FastRewindOutlinedIcon from "@material-ui/icons/FastRewindOutlined";
// import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const youTubeApikey = process.env.REACT_APP_YOUTUBE_API_KEY_SECOND;

class Youtube extends Component {
  state = {
    pip: false,
    playing: true,
    controls: true,
    volume: 1,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    findInput: ""
  };

  playTrack = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    });
  };

  handlePlayPause = () => {
    this.props.youtubePlayerPlayPause(!this.state.playing);
    this.setState({ playing: !this.state.playing });
  };

  handleStop = () => {
    this.setState({ url: null, playing: true, played: 0 });
    this.props.youtubePlayerClose();
  };

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) });
  };

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted });
  };

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip });
  };

  handlePlay = () => {
    this.setState({ playing: true });
  };

  handleEnablePIP = () => {
    this.setState({ pip: true });
  };

  handleDisablePIP = () => {
    this.setState({ pip: false });
  };

  handlePause = () => {
    this.setState({ playing: false });
  };

  handleSeekMouseDown = e => {
    this.setState({ seeking: true });
  };

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = e => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleProgress = state => {
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  handleEnded = () => {};

  handleDuration = duration => {
    this.setState({ duration });
  };

  handleClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player));
  };

  renderLoadButton = (url, label) => {
    return <button onClick={() => this.playTrack(url)}>{label}</button>;
  };

  ref = player => {
    this.player = player;
  };

  // inputOnChange = e => {
  //   this.setState({ findInput: e.target.value });
  // };

  // findSongAndPlay = async () => {
  //   const query = this.state.findInput.replace(/\s+/g, "%20");
  //   const httpQuery = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${query}&key=${youTubeApikey}`;
  //   const res = await axios.get(httpQuery);

  //   const videoId = get(res, "data.items[0].id.videoId", "dQw4w9WgXcQ");
  //   this.playTrack(`https://www.youtube.com/watch?v=${videoId}`);
  //   console.log("res", `https://www.youtube.com/watch?v=${videoId}`)
  //   this.setState({ playing: true });
  // };

  playNext = async () => {
    const artist = this.props.topTracks[0].artist.name;
    const trackNum = this.props.trackNum < 9 ? this.props.trackNum + 1 : 0;
    const trackName = this.props.topTracks[trackNum].name;
    const query = encodeURIComponent(`${artist} ${trackName}`);
    const httpQuery = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${query}&key=${youTubeApikey}`;
    const res = await axios.get(httpQuery);

    const videoId = get(res, `data.items[0].id.videoId`, "dQw4w9WgXcQ");
    const url = `https://www.youtube.com/watch?v=${videoId}`;

    this.props.youtubePlayerChangeTrack(url, trackNum);
  };

  playPrevious = async () => {
    const artist = this.props.topTracks[0].artist.name;
    const trackNum = this.props.trackNum > 0 ? this.props.trackNum - 1 : 9;
    const trackName = this.props.topTracks[trackNum].name;
    const query = encodeURIComponent(`${artist} ${trackName}`);
    const httpQuery = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${query}&key=${youTubeApikey}`;
    const res = await axios.get(httpQuery);

    const videoId = get(res, `data.items[0].id.videoId`, "dQw4w9WgXcQ");
    const url = `https://www.youtube.com/watch?v=${videoId}`;

    this.props.youtubePlayerChangeTrack(url, trackNum);
  };

  render() {
    const { url, playing, controls, volume, muted, played, pip } = this.state;

    return (
      <div className="app">
        <section className="section">
          {this.props.url && (
            <div>
              <div className="player-wrapper">
                <ReactPlayer
                  ref={this.ref}
                  className="react-player"
                  width="100%"
                  height="100%"
                  url={this.props.url}
                  pip={pip}
                  playing={playing}
                  controls={controls}
                  volume={volume}
                  muted={muted}
                  // onReady={() => console.log("onReady")}
                  // onStart={() => console.log("onStart")}
                  onPlay={this.handlePlay}
                  onEnablePIP={this.handleEnablePIP}
                  onDisablePIP={this.handleDisablePIP}
                  onPause={this.handlePause}
                  // onBuffer={() => console.log("onBuffer")}
                  // onSeek={e => console.log("onSeek", e)}
                  onEnded={this.handleEnded}
                  onError={e => console.log("onError", e)}
                  onProgress={this.handleProgress}
                  onDuration={this.handleDuration}
                />
              </div>
              <div className="player-close-icon">
                {this.props.url && (
                  <IconButton onClick={this.handleStop} color="primary">
                    <CloseIcon />
                  </IconButton>
                )}
              </div>
            </div>
          )}

          <ButtonGroup
            className="player-controls"
            color="secondary"
            aria-label="outlined primary button group"
          >
            <Button onClick={this.playPrevious}>
              <FastRewindOutlinedIcon />
            </Button>
            <Button onClick={this.handlePlayPause}>
              {playing ? (
                <PauseCircleOutlineOutlinedIcon />
              ) : (
                <PlayCircleOutlineOutlinedIcon />
              )}
            </Button>
            <Button onClick={this.playNext}>
              <FastForwardOutlinedIcon />
            </Button>

            {/* <input
                placeholder="choose your song"
                onChange={this.inputOnChange}
                value={this.state.findInput}
              />
              <Button onClick={this.findSongAndPlay}>
                <LocationSearchingIcon />
              </Button> */}
            {/* <Button onClick={this.playFromTopTracks}>
                <StopOutlinedIcon />
              </Button> */}
          </ButtonGroup>
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onMouseDown={this.handleSeekMouseDown}
            onChange={this.handleSeekChange}
            onMouseUp={this.handleSeekMouseUp}
          />
          <progress max={1} value={played} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  url: store.youtube.url,
  playing: store.youtube.playing,
  trackNum: store.youtube.trackNum,
  topTracks: store.youtube.topTracks
});

const mapDispatchToProps = dispatch => ({
  youtubePlayerClose: () => dispatch(youtubePlayerCloseAC()),
  youtubePlayerPlayPause: playingToggle =>
    dispatch(youtubePlayerPlayPauseAC(playingToggle)),
  youtubePlayerChangeTrack: (url, trackNum) =>
    dispatch(youtubePlayerChangeTrackAC(url, trackNum)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Youtube));

// export default hot(module)(Youtube);
