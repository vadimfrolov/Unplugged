import React, { Component } from "react";

import UpcomingConcert from "./UpcomingConcert";
import { connect } from "react-redux";
import Spinner from "../Spinner/index";

import {
  fetchPastDates,
  fetchPastDatesAC,
  fetchDate
} from "../../Redux/concertsReducer/concertsActions";

import ConcertsByYear from "./ConcertsByYear";

class ConcertYear extends Component {
  state = {
    year: [],
    isLoading: true
  };
  componentDidMount = async () => {
    const id = this.props.match.params.id;
    let page = 1;
    let res = await this.props.fetchPastDates(id, page);
    while (res) {
      await this.props.fetchPastDatesAC(res);
      await this.props.fetchPastDates(id, page);
      page++;
      res = await this.props.fetchPastDates(id, page);
    }
    this.setState({ isLoading: false});
  };

  onClick = br => {
    const id = this.props.match.params.id;
    this.props.fetchDate(id, br);
  };

  render() {
    const id = this.props.match.params.id;
    return (
      <>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <>
            {" "}
            <UpcomingConcert artistId={id} />
            {this.props.concerts.years &&
              this.props.concerts.years.map((el, i) => {
                return (
                  <button key={i} onClick={() => this.onClick(el)}>
                    {el}
                  </button>
                );
              })}
            <ConcertsByYear nameArtist={this.props.artist.name} />
          </>
        )}
      </>
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
