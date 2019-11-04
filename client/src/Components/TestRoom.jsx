import React, { Component } from "react";
import Player from "react-soundcloud-player";

class TestRoom extends Component {
  render() {
    return (
      <div className="">
        <div className="newContest">
          <h4>Create new contest</h4>
          <input
            name="nameOfContestInput"
            placeholder="Name of the contest"
          ></input>
          <input
            name="descriptionInput"
            placeholder="Write description for the contest"
          ></input>
          <input
            name="rewardInput"
            placeholder="Put here reward for the winner"
          ></input>
          <input
            name="dateInput"
            placeholder="Put here contest deadline"
          ></input>
          <button> create contest </button>
        </div>

        <div className="newFlashmob">
          <h4>Create new Flashmob</h4>
          <input
            name="nameOfFlashmobInput"
            placeholder="Name of the Flashmob"
          ></input>
          <input
            name="descriptionInput"
            placeholder="Write description for what you need to do"
          ></input>
          <input
            name="dateInput"
            placeholder="Put here exact date for flashmob"
          ></input>
          <button> create flashmob </button>
          <iframe
            width="100%"
            height="450"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/174006135&color=%23847c8c&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
          ></iframe>
          "
          <iframe
            width="100%"
            height="450"
            scrolling="no"
            frameborder="no"
            src="https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Fusers%2F56705121&show_artwork=true&auto_play=true"
          ></iframe>
          "
        </div>
      </div>
    );
  }
}

export default TestRoom;
