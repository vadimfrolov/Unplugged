import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { withRouter, Link } from "react-router-dom";

import {
  fetchUpcomingConcertsAC,
  fetchConcertsByDateAC
} from "../../Redux/ConcertExploreReducer/ConcertExploreActions";
import { switchSearchBarAC } from "../../Redux/artistReducer/artistActions";

import { Table, thead, tbody } from "react-materialize";
import "./ConcertExplore.css";

class ConcertExplore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null
    };
  }

  async componentDidMount() {
    await this.props.fetchUpcomingConcertsAC();
    // this.props.switchSearchBarAC();
  }

  handleInput = e => {
    this.setState({ date: e.target.value });
  };

  onClick = async () => {
    await this.props.fetchConcertsByDateAC(this.state.date);
    const date = moment(this.state.date).format("YYYY-MM-DD");
    this.props.history.push(`/explore/${date}`);
  };

  render() {
    return (
      <div>
        <div>
          Choose a date:{" "}
          <input
            type="date"
            value={this.state.date}
            onChange={this.handleInput}
          ></input>
          <button onClick={this.onClick}>Submit</button>
        </div>

        <div className="concertList">
          <Table className=" white-text highlight">
            <thead>
              <tr>
                <th data-field="id">Group</th>
                <th data-field="name"> Date </th>
                <th data-field="price">Place</th>
              </tr>
            </thead>
            <tbody>
              {this.props.events.allEvents &&
                this.props.events.allEvents.map((el, i) => (
                  <tr>
                    <Link to={`/concert/${this.props.events.allEvents[i].id}`}>
                      <td> {el.performance[0].displayName}</td>{" "}
                    </Link>
                    <td className="black-text">{el.start.date}</td>
                    <td>{el.venue.displayName}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        {/* {this.props.events.allEvents &&
          this.props.events.allEvents.map((el, i) => (
            <p key={i}>
              <Link to={`/concert/${this.props.events.allEvents[i].id}`}>
                {el.performance[0].displayName}
              </Link>{" "}
              ~~~~~ {el.start.date} ~~~~~ {el.venue.displayName}
            </p>
          ))} */}
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
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ConcertExplore));
