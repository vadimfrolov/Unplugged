import React, { Component } from "react";

let moment = require("moment");
class CommentsUser extends Comments {
  state = {
    text: "",
    comments: []
  };

  comments = e => {
    this.setState({
      text: e.target.value
    });
  };
  onClick = () => {
    this.setState({
      comments: [
        ...this.state,
        { text: this.state.text, date: moment(new Date()).format("ll") }
      ]
    });
  };
  render() {
    return (
      <div>
        <input type="text" onChange={this.comments} value={this.state.text} />
        <button onClick={this.onClick}>SAVE</button>
        {this.state.comments.map(com => {
          return <div>
              <p>{com.text}</p>
              <p>{com.date}</p>
              </div>;
        })}
      </div>
    );
  }
}
