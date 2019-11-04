import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import { withRouter } from "react-router-dom";

import TourSnippetList from "../../Components/TourSnippet/TourSnippetList";
import TagsList from '../../Components/TagsList';
import SimilarArtistsList from '../../Components/SimilarArtists/SimilarArtistsList';
import CommentSection from '../../Components/CommentSection';

import ShowAll from "../../Components/TourSnippet/ShowAll"

class ArtistInfo extends Component {
  render() {
    const { artist } = this.props;

    const name = get(artist, "name");
    const id = get(artist, "id");
    const content = get(artist, "bio.content");

    return (
      <div>
        <p>{name}</p>
        <p>{content}</p>
        <TagsList />
        <SimilarArtistsList />
        <ShowAll id={artist.id}/>
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
