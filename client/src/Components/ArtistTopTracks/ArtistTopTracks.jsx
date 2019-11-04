import React, { Component }  from "react";
import { connect } from "react-redux";
import axios from 'axios';

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

  fetchTopTracks = () => {
    const res = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artistName}&api_key=${lastfmApiKey}&format=json`);
  }

  render() {
    return tracks.map(({ name }, i) => <ArtistTrack name={name} i={`${i}`} />);
  }
}

const mapStateToProps = state => ({
  artistName: state.artist.tags
});

export default connect(mapStateToProps)(ArtistTopTracks);
