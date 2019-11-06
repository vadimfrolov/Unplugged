import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import { withRouter } from 'react-router-dom';

import { fetchArtistIdAC, fetchArtistInfoAC } from '../../Redux/artistReducer/artistActions';
import { addToFavoriteAC, removeFavoriteAC } from '../../Redux/UserActivity/activityActions';

import TourSnippetList from '../../Components/TourSnippet/TourSnippetList';
import TagsList from '../../Components/TagsList';
import SimilarArtistsList from '../../Components/SimilarArtists/SimilarArtistsList';
import FacebookPanel from '../../Components/FacebookPanel';
import ShowAll from '../../Components/TourSnippet/ShowAll';
import ArtistTopTracks from "../../Components/ArtistTopTracks";
import ShowMap from '../../Components/Map/ShowMap'

import "./ArtistPage.css";


class ArtistInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
    };
  };
  componentDidMount = async () => {
    if (this.props.isSearchBar) {
      console.log('ok')
    } else {
      const id = this.props.match.params.id;
      if (this.props.concertPage.performance !== undefined) {
        const artist = this.props.concertPage.performance.find(item => item.id == id);
        if (artist !== undefined) {
          await this.props.fetchArtistIdAC(artist.displayName);
          await this.props.fetchArtistInfoAC(artist.displayName);
        }
      } else {
        console.table('no artist in state', id)
      }
    }

    this.checkFavorite()
  }

  addToFavorite = async () => {
    await this.props.addToFavoriteAC(this.props.user._id, this.props.match.params.id)
    this.checkFavorite()
  }

  removeFavorite = async () => {
    await this.props.removeFavoriteAC(this.props.user._id, this.props.match.params.id)
    this.checkFavorite()
  }

  checkFavorite = async () => {
    const check = await this.props.user.favouriteGroups.findIndex((e) => {
      return e == this.props.match.params.id
    })
    const state = check === -1
    this.setState({ favorite: state })
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
        {!this.props.user ?
          <></> :
          <>
          {this.state.favorite?
            <button onClick={this.addToFavorite}>add to favorite </button>:
              <button onClick={this.removeFavorite}>remove from fav </button>
            }
          </>
        }
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
  user: store.user.user,
});

const mapDispatchToProps = {
  fetchArtistIdAC,
  fetchArtistInfoAC,
  addToFavoriteAC,
  removeFavoriteAC
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ArtistInfo));
