import React, { Component } from "react";

export default class MusicPlayer extends Component {
  render() {
    return (
      <div>
        <div>
          <input />
          <button> search track </button>
        </div>

        <video controls="yes" name="media">
          <source
            src="https://listen.hs.llnwd.net/g3/4/2/2/8/3/1570238224.mp3"
            type="audio/mpeg"
          />
        </video>
      </div>
    );
  }
}
