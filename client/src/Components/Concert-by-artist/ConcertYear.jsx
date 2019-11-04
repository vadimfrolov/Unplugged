import React, { Component } from "react";
import get from "lodash.get";
// import { Route, Switch, BrowserRouter as Router,Link } from "react-router-dom";

import { connect } from "react-redux";

import {
  fetchPastDates,
  fetchPastDatesAC,
  fetchDate
} from "../../Redux/concertsReducer/concertsActions";

import DataClick from "./DataClick";

class ConcertYear extends Component {
  state = {
    year: []
  };

  componentDidMount = async () => {
    const id  = this.props.match.params.id;
    // const id = this.props.artist.id;
    let page = 1;
    let res = await this.props.fetchPastDates(id, page);
    while (res) {
      await this.props.fetchPastDatesAC(res);
      await this.props.fetchPastDates(id, page);
      page++;
      res = await this.props.fetchPastDates(id, page);
    }
  };

  onClick = br => {
    const id  = this.props.match.params.id;
    this.props.fetchDate(id, br);
  };

  render() {
    return (
      <div>
        {this.props.concerts.years &&
          this.props.concerts.years.map((el, i) => {
            return (
              <button key={i} onClick={() => this.onClick(el)}>
                {el}
              </button>
            );
          })}
        <DataClick nameArtist={this.props.artist.name}/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPastDates: (id, page) => dispatch(fetchPastDates(id, page)),
    fetchPastDatesAC: arr => dispatch(fetchPastDatesAC(arr)),
    fetchDate: (id, year) => dispatch(fetchDate(id, year))
  };
}

function mapStateToProps(store) {
  console.log("ollo.llol", store);
  return {
    artist: store.artist,
    concerts: store.concerts
    // events: store.events
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConcertYear);
