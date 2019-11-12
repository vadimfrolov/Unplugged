import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "react-materialize";

import {
  fetchPastDates,
  fetchPastDatesAC,
  fetchDate,
  fetchUpcomingAC
} from "../../Redux/concertsReducer/concertsActions";

import ConcertsByYear from "./ConcertsByYear";
import Spinner from "../Spinner/index";


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
    this.setState({ isLoading: false });
  };

  onClick = br => {
    const id = this.props.match.params.id;
    this.props.fetchDate(id, br);
  };

  onClickUpcoming = () => {
    const id = this.props.match.params.id;
    this.props.fetchUpcomingAC(id);
  };


  render() {
    return (
      <>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
            <div style={{ marginTop: "30px" }}>
              <Button
                style={{ backgroundColor: "black" }}
                onClick={this.onClickUpcoming}
              >
                Upcoming
            </Button>
              {this.props.concerts.years &&
                this.props.concerts.years.map((el, i) => (
                  <Button
                    className="red darken-4 white-text"
                    key={i}
                    onClick={() => this.onClick(el)}
                  >
                    {el}
                  </Button>
                ))}
              <ConcertsByYear nameArtist={this.props.artist.name} />
            </div>
          )}
      </>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchPastDates: (id, page) => dispatch(fetchPastDates(id, page)),
    fetchPastDatesAC: arr => dispatch(fetchPastDatesAC(arr)),
    fetchDate: (id, year) => dispatch(fetchDate(id, year)),
    fetchUpcomingAC: id => dispatch(fetchUpcomingAC(id))
  };
}

const mapStateToProps = (store) => {
  return {
    artist: store.artist,
    concerts: store.concerts
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConcertYear);
