import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { withRouter, Link } from "react-router-dom";

import M from "materialize-css";
import { Container, Row, Col, Button } from "react-materialize";

import { fetchConcertsByDateAC } from "../../Redux/ConcertExploreReducer/ConcertExploreActions";
import Spinner from "../Spinner/index";

import PlayArtistTopTracks from "../Youtube/PlayArtistTopTracks";

class DateConcerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      isLoading: true
    };
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.fetchConcertsByDateAC(id);
    await this.setState({ isLoading: false });
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
      <>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <>
            <Container
              style={{
                backgroundColor: "black",
                padding: "0px 30px",
                fontSize: "25px"
              }}
            >
              <Row style={{ marginTop: "40px" }}>
                <Col m={4}></Col>
                <Col m={4} style={{ color: "white", marginTop: "40px" }}>
                  Choose a date:{" "}
                  <input
                    style={{ color: "white" }}
                    type="date"
                    value={this.state.date}
                    onChange={this.handleInput}
                  ></input>
                  <Button
                    style={{ backgroundColor: "#b71c1c" }}
                    onClick={this.onClick}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
              <Row style={{ marginTop: "80px", paddingBottom: "80px" }}>
                <ul>
                  {this.props.events.dateEvents &&
                    this.props.events.dateEvents.map((el, i) => (
                      <li
                        style={{
                          padding: "22px",
                          border: "1px solid #424242",
                          marginTop: "10px",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          color: "white"
                        }}
                        key={i}
                      >
                        <Link
                          to={`/concert/${this.props.events.dateEvents[i].id}`}
                        >
                          <Col
                            m={3}
                            style={{
                              fontWeight: "bold",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              color: "white"
                            }}
                          >
                            <i
                              style={{ marginRight: "20px" }}
                              class="small material-icons"
                            >
                              date_range
                            </i>
                            {moment(new Date(el.start.date)).format("ll")}
                          </Col>
                          <Col
                            m={3}
                            style={{
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              color: "white"
                            }}
                          >
                            <i
                              style={{ marginRight: "20px" }}
                              class="small material-icons"
                            >
                              face
                            </i>
                            {el.performance[0]
                              ? el.performance[0].displayName
                              : el.displayName}
                          </Col>
                          <Col
                            m={4}
                            style={{
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              color: "white"
                            }}
                          >
                            <i
                              style={{ marginRight: "20px" }}
                              class="small material-icons"
                            >
                              location_city
                            </i>
                            {el.venue && el.venue.displayName}
                          </Col>
                        </Link>
                        <Col style={{ textAlign: "right" }} m={2}>
                          <PlayArtistTopTracks
                            artist={el.performance[0].displayName}
                            concertPage={true}
                          />
                        </Col>
                      </li>
                    ))}
                </ul>
              </Row>
            </Container>
          </>
        )}
      </>
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
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DateConcerts));
