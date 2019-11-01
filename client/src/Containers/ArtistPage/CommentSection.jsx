import React, { Component } from "react";

class CommentSection extends Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="comment here"></input>
        <button>Send</button>
      </div>
    );
  }
}

export default CommentSection;
