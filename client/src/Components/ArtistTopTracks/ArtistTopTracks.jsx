import React, { Component }  from "react";
import { connect } from "react-redux";
import axios from 'axios';
import get from 'lodash.get';

import ArtistTrack from "./ArtistTrack";

const lastfmApiKey = process.env.REACT_APP_LASTFM_API_KEY;

class ArtistTopTracks extends Component {
  state = {
    artistName: 'cher',
    tracks: []
  };

  componentDidMount() {
    this.fetchTopTracks()
  }

  fetchTopTracks = async () => {
    const res = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${this.state.artistName}&api_key=${lastfmApiKey}&format=json`);
    const tracks = get(res, 'data.toptracks.track', []);
    this.setState({ tracks: tracks });
  }

  render() {
    const { artistName, tracks } = this.state
    return (
      <div>
        <div>Artist Top Tracks:</div>
        {tracks.map(({ name }, i) => <ArtistTrack artistName={artistName} tracks={tracks} trackName={name} key={i} trackNum={i+1}/>)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tags: state.artist.tags
});

export default connect(mapStateToProps)(ArtistTopTracks);
