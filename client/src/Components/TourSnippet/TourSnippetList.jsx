import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

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
      this.props.artist && this.props.artist.tourSnippet.map(({ displayName, location }, i) => (
        <Link to={`/concert/${this.props.artist.tourSnippet[i].id}`}>
          <TourSnippet title={displayName} city={location.city} key={`${displayName}_${i}`} />
        </Link>
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