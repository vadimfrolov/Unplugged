import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import { withRouter } from 'react-router-dom';

import { fetchArtistIdAC, fetchArtistInfoAC } from '../../Redux/artistReducer/artistActions';

import TourSnippetList from '../../Components/TourSnippet/TourSnippetList';
import TagsList from '../../Components/TagsList';
import SimilarArtistsList from '../../Components/SimilarArtists/SimilarArtistsList';
import FacebookPanel from '../../Components/FacebookPanel';
import ShowAll from '../../Components/TourSnippet/ShowAll';
import ArtistTopTracks from "../../Components/ArtistTopTracks";
import ShowMap from '../../Components/Map/ShowMap'

import "./ArtistPage.css";


class ArtistInfo extends Component {
  componentDidMount() {
    if (this.props.isSearchBar) {
      console.log('ok')
    } else {
      const id = this.props.match.params.id;
      if (this.props.concertPage.performance !== undefined) {
        const artist = this.props.concertPage.performance.find(item => item.id == id);
        if (artist !== undefined) {
          this.props.fetchArtistIdAC(artist.displayName);
          this.props.fetchArtistInfoAC(artist.displayName);
        }
      }
    }
  }


  render() {
    const { artist } = this.props;

    const name = get(artist, 'name');
    const content = get(artist, 'bio.content');
    const pic = get(artist, 'pic')

    return (
      <div>
        <div>
          <img src={pic} style={{ maxHeight: '300px' }} />
        </div>
        <p className="groupName">{name}</p>
        <p className="groupDescription">{content}</p>
        <p className="genresName">Genres:</p>
        <TagsList />
        <p className="genresName">Similar artists:</p>
        <SimilarArtistsList />
        <FacebookPanel />
        <TourSnippetList />
        <ShowAll id={artist.id} />
        <ShowMap id={artist.id} />
        <ArtistTopTracks />
      </div>
    );
  }
}


const mapStateToProps = store => ({
  artist: store.artist,
  concertPage: store.concertPage,
});

const mapDispatchToProps = {
  fetchArtistIdAC,
  fetchArtistInfoAC
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ArtistInfo));
