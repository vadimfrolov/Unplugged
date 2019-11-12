import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "react-materialize";

import { fetchDeleteCommentConcertAC } from "../../Redux/concertPageReducer/concertPageActions";

import Comment from "./Comment";


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
                <Comment
                  text={el.text}
                  nameUser={el.nameUser}
                  date={el.date}
                />
                {idUser === el.idUser ? (
                  <Button
                    className="red darken-4"
                    onClick={() => this.onClick(el._id, idConcert)}
                  >
                    Delete
                  </Button>
                ) : null}
              </div>
            );
          })}
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeleteCommentConcertAC: (id, idConcert) =>
      dispatch(fetchDeleteCommentConcertAC(id, idConcert))
  };
}


export default connect(
  null,
  mapDispatchToProps
)(CommentList);
