import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import screenfull from "screenfull";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import get from "lodash.get";

import {
  youtubePlayerCloseAC,
  youtubePlayerPlayPauseAC,
  youtubePlayerChangeTrackAC
} from "../../Redux/youtubeReducer/youtubeActions";

import "./reset.css";
import "./defaults.css";
import "./App.css";

import { Button, ButtonGroup, IconButton } from "@material-ui/core";
import PlayCircleOutlineOutlinedIcon from "@material-ui/icons/PlayCircleOutlineOutlined";
import PauseCircleOutlineOutlinedIcon from "@material-ui/icons/PauseCircleOutlineOutlined";
import FastForwardOutlinedIcon from "@material-ui/icons/FastForwardOutlined";
import FastRewindOutlinedIcon from "@material-ui/icons/FastRewindOutlined";
import CloseIcon from "@material-ui/icons/Close";

const youTubeApikey = process.env.REACT_APP_YOUTUBE_API_KEY;

class Youtube extends Component {
  state = {
    playing: true,
    pip: false,
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
      playing: true,
      url,
      played: 0,
      loaded: 0,
      pip: false,
      playing: true
    });
  };

  handlePlayPause = () => {
    if (this.props.url) {
      this.props.youtubePlayerPlayPause(!this.state.playing);
      this.setState({ playing: !this.state.playing });
    }
  };

  handleStop = () => {
    this.setState({ played: 0 });
    this.props.youtubePlayerClose();
    // this.setState({ playing: !this.state.playing });
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
    this.props.youtubePlayerPlayPause(true);
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
    this.props.youtubePlayerPlayPause(false);
  };

  handleSeekMouseDown = e => {
    this.setState({ seeking: true });
  };

  handleSeekChange = e => {
    if (this.props.playerWindow) {
      this.setState({ played: parseFloat(e.target.value) });
    }
  };

  handleSeekMouseUp = e => {
    this.setState({ seeking: false });
    if (this.props.playerWindow) {
      this.player.seekTo(parseFloat(e.target.value));
    }
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

  playNext = async () => {
    if (this.props.topTracks) {
      const artist = this.props.topTracks[0].artist.name;
      const trackNum = this.props.trackNum < 9 ? this.props.trackNum + 1 : 0;
      const trackName = this.props.topTracks[trackNum].name;
      const query = encodeURIComponent(`${artist} ${trackName}`);
      const httpQuery = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${query}&key=${youTubeApikey}`;
      const res = await axios.get(httpQuery);

      const videoId = get(res, `data.items[0].id.videoId`, "dQw4w9WgXcQ");
      const url = `https://www.youtube.com/watch?v=${videoId}`;

      this.props.youtubePlayerChangeTrack(url, trackNum);
      this.setState({ playing: true });
    }
  };

  playPrevious = async () => {
    if (this.props.topTracks) {
      const artist = this.props.topTracks[0].artist.name;
      const trackNum = this.props.trackNum > 0 ? this.props.trackNum - 1 : 9;
      const trackName = this.props.topTracks[trackNum].name;
      const query = encodeURIComponent(`${artist} ${trackName}`);
      const httpQuery = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${query}&key=${youTubeApikey}`;
      const res = await axios.get(httpQuery);

      const videoId = get(res, `data.items[0].id.videoId`, "dQw4w9WgXcQ");
      const url = `https://www.youtube.com/watch?v=${videoId}`;

      this.props.youtubePlayerChangeTrack(url, trackNum);
      this.setState({ playing: true });
    }
  };

  render() {
    const { url, playing, controls, volume, muted, played, pip } = this.state;

    return (
      <div className="app">
        <section className="section-player">
          {this.props.playerWindow && (
            <div>
              <div className="player-wrapper">
                <ReactPlayer
                  ref={this.ref}
                  className="react-player"
                  width="100%"
                  height="100%"
                  url={this.props.url}
                  pip={pip}
                  playing={this.props.playing}
                  controls={controls}
                  volume={volume}
                  muted={muted}
                  onPlay={this.handlePlay}
                  onEnablePIP={this.handleEnablePIP}
                  onDisablePIP={this.handleDisablePIP}
                  onPause={this.handlePause}
                  onEnded={this.handleEnded}
                  onError={e => console.log("onError", e)}
                  onProgress={this.handleProgress}
                  onDuration={this.handleDuration}
                />
              </div>
              <div className="player-close-icon" color="error">
                {this.props.url && (
                  <IconButton onClick={this.handleStop} color="error">
                    <CloseIcon color="error" />
                  </IconButton>
                )}
              </div>
            </div>
          )}

          <ButtonGroup
            className="player-controls"
            aria-label="outlined primary button group"
            color="secondary"
          >
            <Button onClick={this.playPrevious}>
              <FastRewindOutlinedIcon color="error" />
            </Button>
            <Button onClick={this.handlePlayPause}>
              {this.props.playerWindow && this.props.playing ? (
                <PauseCircleOutlineOutlinedIcon color="error" />
              ) : (
                <PlayCircleOutlineOutlinedIcon color="error" />
              )}
            </Button>
            <Button onClick={this.playNext}>
              <FastForwardOutlinedIcon color="error" />
            </Button>
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
  topTracks: store.youtube.topTracks,
  playerWindow: store.youtube.playerWindow
});

const mapDispatchToProps = dispatch => ({
  youtubePlayerClose: () => dispatch(youtubePlayerCloseAC()),
  youtubePlayerPlayPause: playingToggle =>
    dispatch(youtubePlayerPlayPauseAC(playingToggle)),
  youtubePlayerChangeTrack: (url, trackNum) =>
    dispatch(youtubePlayerChangeTrackAC(url, trackNum))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Youtube));
