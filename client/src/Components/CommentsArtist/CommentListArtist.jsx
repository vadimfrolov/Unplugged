import React, { Component } from "react";

import Comment from "./Comment";

import { connect } from "react-redux";
import { fetchDeleteCommentArtistAC } from "../../Redux/artistReducer/artistActions";
class CommentListArtist extends Component {
  onClick = async (id, idArtist) => {
    await this.props.fetchDeleteCommentArtistAC(id, idArtist);
  };
  render() {
    const { commentsArtists, idArtist, idUser } = this.props;
    const sortCommentsArtist = commentsArtists.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    

    return (
      <div>
        {sortCommentsArtist &&
          sortCommentsArtist.map(el => {
            return (
              <div>
                <Comment
                  text={el.text}
                  nameUser={el.nameUser}
                  date={el.date}
                />
                {idUser === el.idUser ? (
                  <button onClick={() => this.onClick(el._id, idArtist)}>
                    delete
                  </button>
                ) : null}
              </div>
            );
          })}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDeleteCommentArtistAC: (id, idArtist) =>
      dispatch(fetchDeleteCommentArtistAC(id, idArtist))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(CommentListArtist);
