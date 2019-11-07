import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import "./ConcertByYear.css";

let moment = require("moment");



class ConcertsByYear extends Component {
  render() {
  
    return (
     <div className="concertWrapper">
       
          {this.props.concerts.events &&
            this.props.concerts.events.map((event, i) => {
              return (
               
                <div className="concertBlock" key={i}>
                  <Link to={`/concert/${event.id}`}>
                    <div className="hoverable styleHead">{moment(event.start.date).format("ll")}</div>
                  </Link>
                  <div className="styleHead red-text">{this.props.nameArtist}</div>
                  <div className="styleHead white-text">{event.location.city}</div>
                  {/* <div>-------------</div> */}
                </div>
              
              );
              
            })}
            
      
        </div>
    );
  }
}


function mapStateToProps(store) {
  return {
    concerts: store.concerts
  };
}

export default connect(mapStateToProps)(ConcertsByYear);
