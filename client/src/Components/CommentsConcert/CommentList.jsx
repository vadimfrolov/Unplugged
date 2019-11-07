import React, { Component } from "react";

import Comment from "./Comment";
export default class CommentList extends Component {
  render() {
    const { comments } = this.props;
    return (
      <div>
        {comments && comments.map(el => (
          <Comment text={el.text} nameUser={el.nameUser} date={el.date} />
        ))}
      </div>
    );
  }
}
