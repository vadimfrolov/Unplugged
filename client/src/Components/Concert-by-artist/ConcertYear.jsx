import React, { Component } from "react";
// import { Route, Switch, BrowserRouter as Router,Link } from "react-router-dom";

import { connect } from "react-redux";

import { fetchPastDates, fetchPastDatesAC, fetchDate } from "../../redux/actions";

import DataClick from "./DataClick"
class ConcertYear extends Component {
  state = {
    year: []
  };

  componentDidMount = async () => {
    let page = 1;
    let res = await this.props.fetchPastDates(page);
    while (res) {
      await this.props.fetchPastDatesAC(res);
      await this.props.fetchPastDates(page);
      page++;
      res = await this.props.fetchPastDates(page);
    }
  };

  onClick = br => {
    this.props.fetchDate(br)
    // console.log(br);
  };

  render() {
    return (
      <div>
        {this.props.years.map((el, i) => {
          return (
            <button key={i} onClick={() => this.onClick(el)}>
              {el}
            </button>
          );
        })}
      <DataClick/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPastDates: page => dispatch(fetchPastDates(page)),
    fetchPastDatesAC: arr => dispatch(fetchPastDatesAC(arr)),
    fetchDate:year=>dispatch(fetchDate(year)) 
  };
}

function mapStateToProps(store) {
  // console.log(store);
  return {
    years: store.years,
    events:store.events

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConcertYear);
