import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { withRouter, Link } from "react-router-dom";

import { fetchUpcomingConcertsAC, fetchConcertsByDateAC } from "../../Redux/ConcertExploreReducer/ConcertExploreActions";
import { switchSearchBarAC } from "../../Redux/artistReducer/artistActions";


class ConcertExplore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null
    };
  }

  componentDidMount() {
    this.props.fetchUpcomingConcertsAC();
  }

  handleInput = e => {
    this.setState({ date: e.target.value });
  };

  onClick = async () => {
    await this.props.fetchConcertsByDateAC(this.state.date)
    const date = moment(this.state.date).format("YYYY-MM-DD");
    this.props.history.push(`/explore/${date}`);
  }

  onClickPagination = async (e) => {
    await this.props.fetchUpcomingConcertsAC(e.target.innerText)
  }


  render() {
    return (
      <div>
        Choose a date: <input type="date" value={this.state.date} onChange={this.handleInput}></input>
        <button onClick={this.onClick}>Submit</button>
        {this.props.events.allEvents && this.props.events.allEvents.map((el, i) =>
          <p key={i}><Link to={`/concert/${this.props.events.allEvents[i].id}`}>{el.performance[0] ? el.performance[0].displayName : el.displayName}</Link> ~~~~~ {el.start.date} ~~~~~ {el.venue && el.venue.displayName}</p>
        )}
        <div>
          <button onClick={this.onClickPagination}>1</button><button onClick={this.onClickPagination}>2</button><button onClick={this.onClickPagination}>3</button><button onClick={this.onClickPagination}>4</button><button onClick={this.onClickPagination}>5</button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = store => ({
  events: store.events
});

const mapDispatchToProps = {
  fetchUpcomingConcertsAC,
  fetchConcertsByDateAC,
  switchSearchBarAC
};


export default connect(
  mapStateToProps, mapDispatchToProps
)(withRouter(ConcertExplore));
