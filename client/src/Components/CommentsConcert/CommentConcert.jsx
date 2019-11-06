import React, { Component } from "react";
import get from "lodash.get";
import { connect } from "react-redux";

import { fetchAddCommentAC } from "../../Redux/concertPageReducer/concertPageActions";
let moment = require("moment");

class CommentSection extends Component {
  state = {
    text: "",
    date: ""
  };
  handleChange = e => {
    e.preventDefault();
    this.setState({
      text: e.target.value,
      date:  moment(new Date()).format("LLL")
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
      <div>
        <input
          type="text"
          name="text"
          placeholder="comment here"
          value={this.state.text}
          onChange={this.handleChange}
          required
        ></input>
        <button onClick={this.onClick}>Send</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAddCommentAC: comment => dispatch(fetchAddCommentAC(comment))
  };
}

function mapStateToProps(store) {
  return {
    user: store.user
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentSection);
