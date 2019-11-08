import React, { Component } from "react";

import Comment from "./Comment";
export default class CommentListArtist extends Component {
  render() {
    const { commentsArtists } = this.props;
 
    return (
      <div>
        {commentsArtists &&
          commentsArtists.map(el => {
            return (
              <Comment text={el.text} nameUser={el.nameUser} date={el.date} />
            );
          })}
      </div>
    );
  }
}
