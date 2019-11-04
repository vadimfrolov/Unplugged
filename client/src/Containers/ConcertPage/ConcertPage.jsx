import React, { Component } from "react";
import { connect } from 'react-redux';
import get from 'lodash.get';
import { withRouter } from 'react-router-dom';

import { fetchConcertInfoAC } from "../../Redux/concertPageReducer/concertPageActions";

import Flashmob from "../../Components/Flashmob";
import TagsList from '../../Components/TagsList';
import SimilarArtistsList from '../../Components/SimilarArtists/SimilarArtistsList';
import CommentSection from '../../Components/CommentSection';

class ConcertPage extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id
    await this.props.fetchConcertInfoAC(id);
  }

  // async componentDidUpdate(prevProps) {
  //   const id = this.props.match.params.id
  //   if (id && prevProps.concerts.idConcert !== id) {
  //     await this.props.fetchConcertInfoAC(id);
  //   }
  // }

  render() {
    const { concertPage } = this.props;

    const name = get(concertPage, "name");
    const date = get(concertPage, "date");
    const time = get(concertPage, "time");
    const venue = get(concertPage, "venue");
    const performers = get(concertPage, "performers");

    return (
      <div>
        <p>{name}, {date}, {time}, {venue}, {performers.map((el, i) => <p key={`${name}_${i}`}>{el.displayName}</p>)}</p>
        <button>I'll be there!</button>
        <Flashmob />
        <CommentSection />
      </div>
    );
  }
}


const mapStateToProps = store => ({
  concerts: store.concerts,
  concertPage: store.concertPage,
  concerts:store.concertPage
});

const mapDispatchToProps = {
  fetchConcertInfoAC,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ConcertPage));
