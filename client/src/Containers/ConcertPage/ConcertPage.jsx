import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import { withRouter } from "react-router-dom";

import { fetchConcertInfoAC } from "../../Redux/concertPageReducer/concertPageActions";

import Flashmob from "../../Components/Flashmob";

import CommentConcert from "../../Components/CommentsConcert";
import CommentList from "../../Components/CommentsConcert/CommentList";

class ConcertPage extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;

    await this.props.fetchConcertInfoAC(id);
  }
  render() {
    const { concertPage } = this.props;

    const name = get(concertPage, "name");
    const date = get(concertPage, "date");
    const time = get(concertPage, "time");
    const venue = get(concertPage, "venue");
    const comments = concertPage.comments;
    const performers = get(concertPage, "performers");
    const id = get(concertPage, "id");

    return (
      <div>
        <p>
          {name}, {date}, {time}, {venue},{" "}
          {performers.map((el, i) => (
            <p key={`${name}_${i}`}>{el.displayName}</p>
          ))}
        </p>

        <button>I'll be there!</button>
        <Flashmob />

        <CommentConcert nameArtist={performers} idConcert={id} />
        <CommentList comments={comments} />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  artist: store.artist,
  concerts: store.concerts,
  concertPage: store.concertPage,
  concerts: store.concertPage
});

const mapDispatchToProps = {
  fetchConcertInfoAC
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ConcertPage));
