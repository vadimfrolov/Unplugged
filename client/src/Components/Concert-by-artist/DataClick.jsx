import React, { Component } from "react";

import { connect } from "react-redux";

// import { fetchPastDates, fetchPastDatesAC } from "../../redux/actions";

class DataClick extends Component {
  render() {
    return (
      <>
        {this.events.map(event => {
          return <div>{event.date}</div>;
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
  console.log(store);
  return {
    years: store.years,
    events: store.events
  };
}

export default connect(mapStateToProps)(DataClick);
