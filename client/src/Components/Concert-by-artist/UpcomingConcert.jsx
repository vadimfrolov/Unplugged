import React, { Component } from "react";
// import { BrowserRouter as Router, Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUpcomingAC } from "../../Redux/concertsReducer/concertsActions";

class UpcomingConcert extends Component {
  onClick = () => {
    this.props.fetchUpcomingAC(this.props.artistId);
  };
  render() {
    return (
      <div>
        <button onClick={this.onClick}>Upcoming</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUpcomingAC: id => dispatch(fetchUpcomingAC(id))
  };
}
function mapStateToProps(store) {
 
  return {
    artist: store.artist,
    concerts: store.concerts

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpcomingConcert);
