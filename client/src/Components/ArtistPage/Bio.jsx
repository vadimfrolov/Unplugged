import React, { Component } from "react";
import { connect } from 'react-redux';
import Upcoming from "./Upcoming";
import { getArtistId, getArtistInfo } from "../../redux/reducer";

class Bio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: ''
    }
  }


  render() {
    return (
      <div>
        <p>{this.props.artist.name}</p>
        <p>{this.props.artist.bio.content}</p>
        {/* 
        <p>{this.state.artist.tags.tag.map(tag => `${tag.name}, `)}</p>
        <p>{this.state.artist.similar.artist.map(sim => `${sim.name}, `)}</p> */}
        {/* <Upcoming /> */}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    artist: store.artist,
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     getArtistId: () => dispatch(getArtistId()),
//     getArtistInfo: () => dispatch(getArtistInfo())
//   };
// }

export default connect(mapStateToProps)(Bio);