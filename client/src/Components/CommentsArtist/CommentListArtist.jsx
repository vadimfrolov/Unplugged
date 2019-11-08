import React, { Component } from "react";

import Comment from "./Comment";

import { connect } from "react-redux";

import { Button } from "react-materialize";
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
                  <Button className="red darken-4" style={{ marginBottom: "50px" }} onClick={() => this.onClick(el._id, idArtist)}>
                    delete
                  </Button>
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
