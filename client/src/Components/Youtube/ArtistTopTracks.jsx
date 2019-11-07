import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ArtistTopTrack from "./ArtistTopTrack";

class ArtistTopTracks extends Component {
  render() {
    const { artist } = this.props;
    const { topTracks } = artist;

    return (
      <div >
        {topTracks && <div className="genresName">Artist Top Tracks:</div>}
        {topTracks && topTracks.map(({ name }, i) => (
          <ArtistTopTrack
            artist={artist.name}
            topTracks={topTracks}
            trackName={name}
            key={i}
            trackNum={i}
      
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  artist: store.artist
});

export default connect(mapStateToProps)(withRouter(ArtistTopTracks));
