import React, { Component } from "react";
import { connect } from 'react-redux';
import get from 'lodash.get';
import { withRouter, Link } from 'react-router-dom';

import { fetchConcertInfoAC } from "../../Redux/concertPageReducer/concertPageActions";

import Flashmob from "../../Components/Flashmob";
import CommentSection from "../../Components/CommentsConcert";
import CommentList from "../../Components/CommentsConcert/CommentList";


class ConcertPage extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchConcertInfoAC(id);
  }

  
  render() {
    const { concertPage } = this.props;

    const id = get(concertPage, "id");
    const name = get(concertPage, "displayName");
    const date = get(concertPage, "start.date");
    const time = get(concertPage, "start.time");
    const venue = get(concertPage, "venue.displayName");
    const performers = get(concertPage, "performance");
    const location = get(concertPage, "location.city");
    const comments = get(concertPage, "comments");

    return (
      <div>
        <p>{name}, 
        {date}, 
        {time}, 
        {venue}, 
        {location}, 
        {performers && performers.map(
          (el, i) => (
          <p key={`${name}_${i}`}>
            <Link to={`/artists/${performers[i].id}`}>
              {el.displayName}
            </Link>
          </p>
          ))}
        </p>
        <button>I'll be there!</button>
        <Flashmob />
        <CommentSection nameArtist={performers} idConcert={id} />
        <CommentList comments={comments} />
      </div>
    );
  }
}


const mapStateToProps = store => ({
  artist: store.artist,
  concerts: store.concerts,
  concertPage: store.concertPage,
  // concerts: store.concertPage
});

const mapDispatchToProps = {
  fetchConcertInfoAC
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ConcertPage));
