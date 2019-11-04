import React, { Component } from "react";

let moment = require("moment");
export default class CommentSection extends Component {
  state = {
    text: "",
    date: ""
  };


  render() {
    console.log(this.props)
    return (
      <div>
        <input type="text" placeholder="comment here" value={this.state.text}></input>
        <button>Send</button>
      </div>
    );
  }
}
