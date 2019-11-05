import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { hot } from "react-hot-loader";
import screenfull from "screenfull";
import ReactPlayer from "react-player";
import axios from 'axios';
import get from 'lodash.get';

import "./reset.css";
import "./defaults.css";
import "./App.css";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import PauseOutlinedIcon from "@material-ui/icons/PauseOutlined";
import StopOutlinedIcon from "@material-ui/icons/StopOutlined";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";


const youTubeApikey = process.env.REACT_APP_YOUTUBE_API_KEY

class Youtube extends Component {
  state = {
    url: null,
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

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    });
  };

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  handleStop = () => {
    this.setState({ url: null, playing: true, played: 0 });
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

  handleEnded = () => {
  };

  handleDuration = duration => {
    this.setState({ duration });
  };

  handleClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player));
  };

  renderLoadButton = (url, label) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };

  ref = player => {
    this.player = player;
  };

  inputOnChange = e => {
    this.setState({ findInput: e.target.value });
  };

  findSongAndPlay = async () => {
    const query = this.state.findInput.replace(/\s+/g, "%20");
    const httpQuery = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&order=relevance&q=${query}&key=${youTubeApikey}`;
    const res = await axios.get(httpQuery);

    const videoId = get(res, 'data.items[0].id.videoId', 'dQw4w9WgXcQ');
    this.load(`https://www.youtube.com/watch?v=${videoId}`);
    this.setState({ playing: true });
  };

  render() {
    const { url, playing, controls, volume, muted, played, pip } = this.state;

    return (
      <div className="app">
        <section className="section">
          <div className="player-wrapper">
            <ReactPlayer
              ref={this.ref}
              className="react-player"
              width="100%"
              height="100%"
              url={url}
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
            {this.state.url && (
              <IconButton onClick={this.handleStop} color="primary">
                <CloseIcon />
              </IconButton>
            )}
          </div>

          <div className="">
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={this.handlePlayPause}
                color="secondary"
                startIcon={
                  playing ? <PauseOutlinedIcon /> : <PlayArrowOutlinedIcon />
                }
              ></Button>
              <Button
                onClick={this.handleStop}
                color="secondary"
                startIcon={<StopOutlinedIcon />}
              ></Button>

              
              <input className="input"
                placeholder="choose your song"
                onChange={this.inputOnChange}
                value={this.state.findInput}
              />
              <Button onClick={this.findSongAndPlay}>
                <PlayArrowOutlinedIcon />
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
          </div>
        </section>
      </div>
    );
  }
}

export default hot(module)(Youtube);
