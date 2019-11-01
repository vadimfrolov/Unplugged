import React, { Component } from "react";

import { connect } from "react-redux";

// import { fetchPastDates, fetchPastDatesAC } from "../../redux/actions";

class DataClick extends Component {
  render() {
    return (
      <>
        {this.props.events &&
          this.props.events.map((event, i) => {
            return (
              <div key={i}>
                <div>{event.date}</div>
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
  console.log("D", store);
  return {
    events: store.events
  };
}

export default connect(mapStateToProps)(DataClick);
