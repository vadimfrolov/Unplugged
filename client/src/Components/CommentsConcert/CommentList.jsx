import React, { Component } from "react";

import Comment from "./Comment";

import { connect } from "react-redux";
import { fetchDeleteCommentConcertAC } from "../../Redux/concertPageReducer/concertPageActions";
class CommentList extends Component {
  onClick = async (id, idConcert) => {
    await this.props.fetchDeleteCommentConcertAC(id, idConcert);
  };
  render() {
    const { comments, idConcert, idUser } = this.props;
    return (
      <div>
        {comments &&
          comments.map(el => {
            return (
              <div>
                <Comment text={el.text} nameUser={el.nameUser} date={el.date} />
                {idUser === el.idUser ? (
                  <button onClick={() => this.onClick(el._id, idConcert)}>
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
    fetchDeleteCommentConcertAC: (id, idConcert) =>
      dispatch(fetchDeleteCommentConcertAC(id, idConcert))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(CommentList);
