import React, { Component } from "react";

import { connect } from "react-redux";
let moment = require("moment");


class DataClick extends Component {
  render() {
    return (
      <>
        {this.props.conserts.events &&
          this.props.conserts.events.map((event, i) => {
            return (
              <div key={i}>
                <div>{moment(event.date).format("ll")}</div>
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

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchPastDates: page => dispatch(fetchPastDates(page)),
//     fetchPastDatesAC: arr => dispatch(fetchPastDatesAC(arr))
//   };
// }

function mapStateToProps(store) {
  // console.log("D", store.conserts);
  return {
    conserts: store.conserts
  };
}

export default connect(mapStateToProps)(DataClick);
