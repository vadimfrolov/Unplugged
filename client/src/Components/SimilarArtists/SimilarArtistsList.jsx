import React from 'react'
import { connect } from 'react-redux';

import SimilarArtist from './SimilarArtist';

const SimilarArtistsList = ({ similar }) => {
  return similar.map(({ name }, i) => (
    <SimilarArtist title={name} key={`${name}_${i}`} />
  ));
}

const mapStateToProps = (state) => ({
  similar: state.artist.similar
});

export default connect(
  mapStateToProps
)(SimilarArtistsList);