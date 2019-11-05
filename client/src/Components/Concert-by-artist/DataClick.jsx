import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { connect } from "react-redux";
let moment = require("moment");

class DataClick extends Component {
  render() {
    return (
      <>
        {this.props.concerts.events &&
          this.props.concerts.events.map((event, i) => {
            return (
              <div key={i}>
                <Link to={`/concert/${event.idConcert}`}>
                  <div>{moment(event.date).format("ll")}</div>
                </Link>

                <div>{this.props.nameArtist}</div>
                <div>{event.country}</div>
                {/* <div>{event.location.lat}</div>
                <div>{event.location.lng}</div> */}
                <div>-------------</div>
              </div>
            );
          })}
      </>
    );
  }
}


function mapStateToProps(store) {
  return {
    concerts: store.concerts
  };
}

export default connect(mapStateToProps)(DataClick);
