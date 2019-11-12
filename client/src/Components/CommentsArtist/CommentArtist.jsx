import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";

import M from "materialize-css";
import {
  Row,
  Button,
  Textarea, Icon
} from "react-materialize";

import { fetchAddCommentArtistAC } from "../../Redux/artistReducer/artistActions";


class CommentArtist extends Component {
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
    const { nameArtist, idArtist, user } = this.props;
    const nameuser = get(user, "user.username");
    const iduser = get(user, "user._id");
    const { text, date } = this.state;
    let comment = {
      nameArtist: nameArtist,
      idArtist: idArtist,
      comments: {
        nameUser: nameuser,
        idUser: iduser,
        text: text,
        date: date
      }
    };
    await this.props.fetchAddCommentArtistAC(comment);
    await this.setState({ text: "", data: "" });
  };


  render() {
    return (
      <>
        <Row>
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


const mapStateToProps = (store) => {
  return {
    user: store.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAddCommentArtistAC: comment =>
      dispatch(fetchAddCommentArtistAC(comment))
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentArtist);
