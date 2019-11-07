import React, { Component } from "react";
import get from "lodash.get";
import { connect } from "react-redux";

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
    fetchAddCommentArtistAC: comment => dispatch(fetchAddCommentArtistAC(comment))
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
)(CommentArtist);
