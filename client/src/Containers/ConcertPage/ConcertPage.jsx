import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import get from "lodash.get";
import moment from "moment";

import {
  Container,
  Row,
  Col,
  Card,
  Chip
} from "react-materialize";

import { fetchConcertInfoAC } from "../../Redux/concertPageReducer/concertPageActions";
import {
  fetchArtistIdAC,
  fetchArtistInfoAC,
  keepArtistNameAC
} from "../../Redux/artistReducer/artistActions";

import CommentConcert from "../../Components/CommentsConcert";
import CommentList from "../../Components/CommentsConcert/CommentList";
import GoButton from "../../Components/GoButton/GoButton";
import Spinner from "../../Components/Spinner/index";

import "./concertPage.css";


class ConcertPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concertGo: false,
      isLoading: true,
      concertBeen: false
    };
  }

  componentDidMount = async () => {
    const id = this.props.match.params.id;
    await this.props.fetchConcertInfoAC(id);
    this.setState({ isLoading: false });
  };

  onClick = async (e, id) => {
    const name = e;
    const artistId = id;
    await this.props.fetchArtistIdAC(name);
    await this.props.fetchArtistInfoAC(name);
    await this.props.keepArtistNameAC(name, artistId);
    this.props.history.push(`/artists/${artistId}`);
  };


  render() {
    const { concertPage } = this.props;

    const id = get(concertPage, "id");
    const name = get(concertPage, "displayName");
    const date = get(concertPage, "start.date");
    const time = get(concertPage, "start.time");
    const venue = get(concertPage, "venue.displayName");
    const performers = get(concertPage, "performance");
    const location = get(concertPage, "location.city");
    const comments = get(concertPage, "comments");

    return (
      <>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
            <>
              <Container
                style={{
                  marginTop: "40px",
                  padding: "0px 30px",
                  borderRadius: "3%"
                }}
              >
                <Row>
                  <Col m={12} s={12}>
                    <Card
                      className="black"
                      textClassName="white-text"
                      title={name}
                    >
                      <Row>
                        <Col m={9}>
                          <p
                            style={{ fontSize: "35px", marginBottom: "25px" }}
                            className="pointConcert"
                          >
                            {name}
                          </p>
                        </Col>
                        <Col style={{ textAlign: "right" }} m={3}>
                          {!this.props.user ? (
                            <></>
                          ) : (
                              <GoButton
                                concertPage={this.props.concertPage}
                                user={this.props.user}
                              />
                            )}
                        </Col>
                      </Row>
                      <p
                        style={{ fontSize: "25px", marginBottom: "25px" }}
                        className="pointConcert"
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: "35px",
                            color: "#b71c1c",
                            marginRight: "15px"
                          }}
                        >
                          When:
                      </span>{" "}
                        {moment(new Date(date)).format("LL")}, {time}
                      </p>
                      <p style={{ fontSize: "25px", marginBottom: "25px" }}>
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: "35px",
                            color: "#b71c1c",
                            marginRight: "15px"
                          }}
                        >
                          Where:
                      </span>
                        {venue}, {location}
                      </p>
                      <p style={{ fontSize: "25px", marginBottom: "25px" }}>
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: "35px",
                            color: "#b71c1c",
                            marginRight: "15px"
                          }}
                        >
                          Performers:
                      </span>
                        {performers &&
                          performers.map((el, i) => (
                            <Chip className="performersList" key={`${name}_${i}`}>
                              <Link
                                style={{ color: "black" }}
                                to={`/artists/${el.id}`}
                                value={el.displayName}
                                onClick={() => this.onClick(el.displayName, el.id)}
                              >
                                {el.displayName}
                              </Link>
                            </Chip>
                          ))}
                      </p>
                      <>
                        {!this.props.user ? (
                          <CommentList comments={comments} idConcert={id} />
                        ) : (
                            <>
                              <CommentList
                                comments={comments}
                                idConcert={id}
                                idUser={this.props.user._id}
                              />
                              <CommentConcert
                                nameArtist={performers}
                                idConcert={id}
                              />
                            </>
                          )}
                      </>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </>
          )}
      </>
    );
  }
}


const mapStateToProps = store => ({
  artist: store.artist,
  concerts: store.concerts,
  concertPage: store.concertPage,
  user: store.user.user
});

const mapDispatchToProps = {
  fetchConcertInfoAC,
  fetchArtistIdAC,
  fetchArtistInfoAC,
  keepArtistNameAC
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ConcertPage));
