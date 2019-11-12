import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";

import M from "materialize-css";
import {
  Row,
  Button,
  Textarea
} from "react-materialize";

import { fetchAddCommentAC } from "../../Redux/concertPageReducer/concertPageActions";


class CommentConcert extends Component {
  state = {
    text: "",
    date: ""
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      text: e.target.value,
      date: new Date()
    });
  };

  onClick = async () => {
    const { nameArtist, idConcert, user } = this.props;
    const nameuser = get(user, "user.username");
    const iduser = get(user, "user._id");
    const { text, date } = this.state;
    let concert = {
      nameArtists: nameArtist,
      idConcert: idConcert,
      comments: {
        nameUser: nameuser,
        idUser: iduser,
        text: text,
        date: date
      }
    };
    await this.props.fetchAddCommentAC(concert);
    await this.setState({ text: "", data: "" });
  };


  render() {
    return (
      <>
        <Row style={{ marginTop: "40px" }}>
          <Textarea xl={8}
            style={{ color: "white" }}
            type="text"
            name="text"
            placeholder="Add a comment"
            value={this.state.text}
            onChange={this.handleChange}
            required
          />
        </Row>
        <Button
          style={{ marginTop: "-60px" }}
          className="red darken-4"
          onClick={this.onClick}
        >
          Add
        </Button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAddCommentAC: comment => dispatch(fetchAddCommentAC(comment))
  };
}

const mapStateToProps = (store) => {
  return {
    user: store.user
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentConcert);
