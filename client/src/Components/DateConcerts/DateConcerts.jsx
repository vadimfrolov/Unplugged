import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { withRouter, Link } from "react-router-dom";

import { fetchConcertsByDateAC } from "../../Redux/ConcertExploreReducer/ConcertExploreActions";


class DateConcerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null
    };
  }

  async componentDidMount() {
    const id = this.props.match.params.id
    console.log(id)
    await this.props.fetchConcertsByDateAC(id);
  }

  handleInput = e => {
    this.setState({ date: e.target.value });
  };

  onClick = async () => {
    await this.props.fetchConcertsByDateAC(this.state.date)
    const date = moment(this.state.date).format("YYYY-MM-DD");
    this.props.history.push(`/explore/${date}`);
  }


  render() {
    return (
      <div>
        Choose a date: <input type="date" value={this.state.date} onChange={this.handleInput}></input>
        <button onClick={this.onClick}>Submit</button>
        {this.props.events.dateEvents && this.props.events.dateEvents.map((el, i) =>
          <p><Link to={`/concert/${this.props.events.dateEvents[i].id}`}>{el.performance[0].displayName}</Link> ~~~~~ {el.start.date} ~~~~~ {el.venue.displayName}</p>
        )}
      </div>
    );
  }
}


const mapStateToProps = store => ({
  events: store.events
});

const mapDispatchToProps = {
  fetchConcertsByDateAC
};


export default connect(
  mapStateToProps, mapDispatchToProps
)(withRouter(DateConcerts));
