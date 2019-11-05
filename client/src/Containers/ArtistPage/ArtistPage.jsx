import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import { withRouter } from "react-router-dom";

import TourSnippetList from "../../Components/TourSnippet/TourSnippetList";
import TagsList from '../../Components/TagsList';
import SimilarArtistsList from '../../Components/SimilarArtists/SimilarArtistsList';
import CommentSection from '../../Components/CommentSection';
import ArtistTopTracks from "../../Components/ArtistTopTracks"

import "./ArtistPage.css";

import ShowAll from "../../Components/TourSnippet/ShowAll"
import ShowMap from '../../Components/Map/ShowMap'

class ArtistInfo extends Component {
  render() {
    const { artist } = this.props;

    const name = get(artist, "name");
    const content = get(artist, "bio.content");

    return (
      <div>
        <p className="groupName">{name}</p>
        <p className="groupDescription">{content}</p>
        <p className="genresName">Genres:</p>
        <TagsList />
        <p className="genresName">Similar artists:</p>
        <SimilarArtistsList />
        <ShowAll id={artist.id}/>
        <ShowMap id={artist.id}/>
        <ArtistTopTracks />
        <TourSnippetList/>
        <CommentSection />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  artist: store.artist
});

export default connect(
  mapStateToProps,
)(withRouter(ArtistInfo));
