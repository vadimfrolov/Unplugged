import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import { withRouter } from "react-router-dom";

import { fetchArtistConcertAC } from "../../redux/actions/artistActions";

import TourSnippet from "../../Components/TourSnippet/TourSnippetList";
import TagsList from "../../Components/TagsList";
import SimilarArtistsList from "../../Components/SimilarArtists/SimilarArtistsList";
import CommentSection from "../../Components/CommentSection";

class ArtistInfo extends Component {
  render() {
    const { artist } = this.props;

    const name = get(artist, "name");
    const content = get(artist, "bio.content");

    return (
      <div>
        <p>{name}</p>
        <p>{content}</p>
        <TagsList />
        <SimilarArtistsList />
        <TourSnippet />
        <git />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  artist: store.artist
});

const mapDispatchToProps = {
  fetchArtistConcertAC
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ArtistInfo));
