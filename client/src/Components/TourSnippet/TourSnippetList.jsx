import React, { Component } from "react";
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { fetchArtistConcertAC } from "../../Redux/artistReducer/artistActions";

import TourSnippet from './TourSnippet'


class TourSnippetList extends Component {
  async componentDidMount() {
    await this.props.fetchArtistConcertAC(this.props.artist.id);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.artist.id && prevProps.artist.id !== this.props.artist.id) {
      await this.props.fetchArtistConcertAC(this.props.artist.id);
    }
  }


  render() {
    return (
      this.props.artist && this.props.artist.tourSnippet.map(({ id, displayName, location, start }, i) => (
      <TourSnippet id={id} title={displayName} city={location.city} start={start.date} key={`${displayName}_${i}`} />
    )))
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