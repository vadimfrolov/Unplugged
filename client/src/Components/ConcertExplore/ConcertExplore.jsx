import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { withRouter, Link } from "react-router-dom";

import {
  fetchUpcomingConcertsAC,
  fetchConcertsByDateAC
} from "../../Redux/ConcertExploreReducer/ConcertExploreActions";
import { switchSearchBarAC } from "../../Redux/artistReducer/artistActions";

import M from "materialize-css";
import {
  Container,
  Row,
  Col,
  Button,
} from "react-materialize";

import "./ConcertExplore.css";

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
    await this.props.fetchConcertsByDateAC(this.state.date);
    const date = moment(this.state.date).format("YYYY-MM-DD");
    this.props.history.push(`/explore/${date}`);
  }

  onClickPagination = async (e) => {
    await this.props.fetchUpcomingConcertsAC(e.target.innerText)
  }


  render() {
    return (
      <Container style={{ backgroundColor: "black", padding: "0px 30px", borderRadius: "3%", fontSize: "25px" }}>
        <Row style={{ marginTop: "40px" }}>
          <Col m={4}></Col><Col m={4} style={{ color: "white", marginTop: "40px" }}>
            Choose a date: <input style={{ color: "white" }} type="date" value={this.state.date} onChange={this.handleInput}></input>
            <Button style={{ backgroundColor: "#b71c1c" }} onClick={this.onClick}>Submit</Button>
          </Col>
        </Row>
        <Row style={{ marginTop: "80px" }}>
          <ul>
          {this.props.events.allEvents && this.props.events.allEvents.map((el, i) =>
            <Link to={`/concert/${this.props.events.allEvents[i].id}`}>
              <li style={{ padding: "22px", border: "1px solid #424242", marginTop: "10px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", color: "white" }} key={i}>
              <Col m={4} style={{ fontWeight:"bold", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", color: "white" }}><i style={{ marginRight:"20px" }} class="small material-icons">date_range</i>{moment(new Date(el.start.date)).format("ll")}</Col>
              <Col m={4} style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", color: "white" }}><i style={{ marginRight:"20px" }} class="small material-icons">face</i>{el.performance[0] ? el.performance[0].displayName : el.displayName}</Col>
              <Col m={4} style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", color: "white" }}><i style={{ marginRight:"20px" }} class="small material-icons">location_city</i>{el.venue && el.venue.displayName}</Col>
              </li>
              </Link>
          )}
          <Col m={4}></Col><Col style={{ margin: "40px 0px" }}>
            <Button style={{ backgroundColor: "#b71c1c" }} onClick={this.onClickPagination}>1</Button>
            <Button style={{ backgroundColor: "#b71c1c" }} onClick={this.onClickPagination}>2</Button>
            <Button style={{ backgroundColor: "#b71c1c" }} onClick={this.onClickPagination}>3</Button>
            <Button style={{ backgroundColor: "#b71c1c" }} onClick={this.onClickPagination}>4</Button>
            <Button style={{ backgroundColor: "#b71c1c" }} onClick={this.onClickPagination}>5</Button>
          </Col>
          </ul>
        </Row>
      </Container>
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
