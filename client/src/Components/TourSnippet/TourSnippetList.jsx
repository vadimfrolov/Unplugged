import React, { Component } from "react";
import { connect } from 'react-redux';
import get from 'lodash.get';
import { withRouter } from 'react-router-dom';

import { fetchArtistConcertAC } from "../../redux/actions/artistActions";

import TourSnippet from './TourSnippet'

class TourSnippetList extends Component {
  async componentDidMount() {
    await this.props.fetchArtistConcertAC(this.props.artist.id);
  }

  render() {
    return this.props.artist.tourSnippet.map(({ id, displayName, location, start }, i) => (
      <TourSnippet id={id} title={displayName} city={location.city} start={start.date} key={`${displayName}_${i}`} />
    ));
  }
}

const mapStateToProps = state => ({
  artist: state.artist,
});

const mapDispatchToProps = {
  fetchArtistConcertAC,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TourSnippetList)
);