import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { hot } from "react-hot-loader";
import screenfull from "screenfull";
import ReactPlayer from "react-player";

import "./reset.css";
import "./defaults.css";
import "./App.css";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import PauseOutlinedIcon from "@material-ui/icons/PauseOutlined";
import StopOutlinedIcon from "@material-ui/icons/StopOutlined";

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
    duration: 0
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
    console.log("onPlay");
    this.setState({ playing: true });
  };

  handleEnablePIP = () => {
    console.log("onEnablePIP");
    this.setState({ pip: true });
  };

  handleDisablePIP = () => {
    console.log("onDisablePIP");
    this.setState({ pip: false });
  };

  handlePause = () => {
    console.log("onPause");
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
    console.log("onProgress", state);
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  handleEnded = () => {
    console.log("onEnded");
  };

  handleDuration = duration => {
    console.log("onDuration", duration);
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

  render() {
    const {
      url,
      playing,
      controls,
      volume,
      muted,
      played,
      pip
    } = this.state;

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
              onReady={() => console.log("onReady")}
              onStart={() => console.log("onStart")}
              onPlay={this.handlePlay}
              onEnablePIP={this.handleEnablePIP}
              onDisablePIP={this.handleDisablePIP}
              onPause={this.handlePause}
              onBuffer={() => console.log("onBuffer")}
              onSeek={e => console.log("onSeek", e)}
              onEnded={this.handleEnded}
              onError={e => console.log("onError", e)}
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}
            />
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

              <Button
                onClick={() =>
                  this.load("https://www.youtube.com/watch?v=oUFJJNQGwhk")
                }
              >
                YT
              </Button>
              <Button
                onClick={() =>
                  this.load(
                    "https://soundcloud.com/miami-nights-1984/accelerated"
                  )
                }
              >
                SC
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
