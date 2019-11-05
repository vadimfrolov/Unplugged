import React, { Component } from "react";

import { connect } from "react-redux";

import {
  fetchPastDates,
  fetchPastDatesAC,
  fetchDate
} from "../../Redux/concertsReducer/concertsActions";

import ConcertsByYear from "./ConcertsByYear";

class ConcertYear extends Component {
  state = {
    year: []
  };

  componentDidMount = async () => {
    const id  = this.props.match.params.id;
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
        <ConcertsByYear nameArtist={this.props.artist.name}/>
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
  return {
    artist: store.artist,
    concerts: store.concerts
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConcertYear);