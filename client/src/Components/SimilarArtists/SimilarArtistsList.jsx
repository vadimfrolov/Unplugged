import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  fetchArtistIdAC,
  fetchArtistInfoAC,
  keepArtistNameAC,
} from '../../Redux/artistReducer/artistActions';

import SimilarArtist from "./SimilarArtist";


class SimilarArtistsList extends React.Component {
  async onClick(name) {
    await this.props.fetchArtistIdAC(name);
    await this.props.fetchArtistInfoAC(name);
    await this.props.keepArtistNameAC(name, this.props.artist.id)
    this.props.history.push(`/artists/${this.props.artist.id}`);
  }

  
  render() {
    return this.props.artist.similar && this.props.artist.similar.map((el, i) => (
      <span value={el.name} onClick={() => this.onClick(el.name)}>
        <SimilarArtist title={el.name} key={`${el.name}_${i}`} />
      </span>
    ));
  }
}


const mapStateToProps = (store) => ({
  artist: store.artist,
});

const mapDispatchToProps = {
  fetchArtistIdAC,
  fetchArtistInfoAC,
  keepArtistNameAC,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SimilarArtistsList));
