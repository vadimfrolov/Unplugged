import React, { Component } from "react";
import { connect } from 'react-redux';
import get from 'lodash.get';
import { withRouter } from 'react-router-dom';

import TourSnippet from "../../Components/TourSnippet/TourSnippetList";
import TagsList from '../../Components/TagsList';
import SimilarArtistsList from '../../Components/SimilarArtists/SimilarArtistsList';
import CommentSection from '../../Components/CommentSection';

class ConcertPage extends Component {
  render() {
    return (
      <div>
        <button>I'll be there!</button>
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
)(withRouter(ConcertPage));
