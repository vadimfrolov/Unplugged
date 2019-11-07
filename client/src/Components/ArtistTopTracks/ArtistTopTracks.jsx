import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ArtistTrack from "./ArtistTrack";

class ArtistTopTracks extends Component {
  render() {
    const { artist } = this.props;
    const { topTracks } = artist;

    return (
      <div style={{marginTop:"35px"}} >
        {topTracks && <div className="genresName">Top Tracks:</div>}
        {topTracks && topTracks.map(({ name }, i) => (
          <ArtistTrack
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
