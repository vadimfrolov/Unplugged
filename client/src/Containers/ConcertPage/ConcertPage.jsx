import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import { withRouter, Link } from "react-router-dom";
import moment from "moment";

import "./concertPage.css";

import { fetchConcertInfoAC } from "../../Redux/concertPageReducer/concertPageActions";
import { previousConcertAC, upcomingConcertAC, upcomingConcertCancelAC } from '../../Redux/UserActivity/activityActions'

import CommentConcert from "../../Components/CommentsConcert";
import CommentList from "../../Components/CommentsConcert/CommentList";


import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Chip
} from "react-materialize";

class ConcertPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concertGo: false,
    };
  };

  componentDidMount = async () => {
    const id = this.props.match.params.id
    await this.props.fetchConcertInfoAC(id);
    await this.concertActivityCheck()
  }


  convertDate = () => {
    const date = get(this.props.concertPage, "start.date")
    return new Date(date)
  }

  previousConcert = async () => {
    await this.props.previousConcertAC(
      {
        userId: this.props.user._id,
        eventName: this.props.concertPage.displayName,
        eventDate: this.props.concertPage.start.date,
        eventLocation: this.props.concertPage.location,
      },
      this.props.concertPage.id)
    this.concertActivityCheck()
  }

  concertActivityCheck = () => {

    const check = this.props.user.upcomingConcerts.find((e) => {
      return e.concertId == this.props.concertPage.id
    })

    !check ?
      this.setState({ concertGo: false }) :
      this.setState({ concertGo: true });

  }

  upcomingConcert = async () => {
    await this.props.upcomingConcertAC(
      {
        userId: this.props.user._id,
        eventName: this.props.concertPage.displayName,
        eventDate: this.props.concertPage.start.date,
        eventLocation: this.props.concertPage.location,
      },
      this.props.concertPage.id)

    this.concertActivityCheck()

  }

  upcomingConcertCancel = async () => {
    await this.props.upcomingConcertCancelAC(this.props.user._id, this.props.concertPage.id)
    this.concertActivityCheck()
  }

  render() {
    const { concertPage } = this.props;
    const concertFlag = this.state.concertGo

    const id = get(concertPage, "id");
    const name = get(concertPage, "displayName");
    const date = get(concertPage, "start.date");
    const time = get(concertPage, "start.time");
    const venue = get(concertPage, "venue.displayName");
    const performers = get(concertPage, "performance");
    const location = get(concertPage, "location.city");
    const comments = get(concertPage, "comments");


    return (
      <Container style={{ marginTop:"40px", padding: "0px 30px", borderRadius: "3%" }}>
        <Row>
          <Col m={12} s={12}>
            <Card
              className="black"
              textClassName="white-text"
            >
              <Row>
                <Col m={9}>
                  <p style={{ fontSize: "35px", marginBottom: "25px" }} className="pointConcert" >
                    {name}
                  </p>
                </Col>
                <Col style={{ textAlign: "right" }} m={3}>
                  {this.convertDate() > Date.now() ?
                    <>
                      {!concertFlag ?
                        <Button large className="red darken-4" onClick={this.upcomingConcert}>I'll be there!</Button> :
                        <Button large className="red darken-4" onClick={this.upcomingConcertCancel}>I won't go</Button>
                      }
                    </> :
                    <>
                      <Button large className="red darken-4" onClick={this.previousConcert}>I've been there!</Button>
                    </>}
                </Col>
              </Row>
              <p style={{ fontSize: "25px", marginBottom: "25px" }} className="pointConcert" >
                <span style={{ fontWeight: "bold", fontSize: "35px", color: "#b71c1c", marginRight: "15px" }}>When:</span> {moment(new Date(date)).format("LL")}, {time}
              </p>
              <p style={{ fontSize: "25px", marginBottom: "25px" }}>
                <span style={{ fontWeight: "bold", fontSize: "35px", color: "#b71c1c", marginRight: "15px" }}>Where:</span>
                {venue}, {location}
              </p>
              <p style={{ fontSize: "25px", marginBottom: "25px" }}>
                <span style={{ fontWeight: "bold", fontSize: "35px", color: "#b71c1c", marginRight: "15px" }}>Performers:</span>
                {performers && performers.map((el, i) => (
                  <Chip className="performersList" key={`${name}_${i}`}>
                    <Link style={{ color: "black" }} to={`/artists/${performers[i].id}`}>
                      {el.displayName}
                    </Link>
                  </Chip>
                ))}
              </p>
              <CommentConcert nameArtist={performers} idConcert={id} />
              <CommentList comments={comments} />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = store => ({
  artist: store.artist,
  concerts: store.concerts,
  concertPage: store.concertPage,
  user: store.user.user,
  // concerts: store.concertPage
});

const mapDispatchToProps = {
  fetchConcertInfoAC,
  previousConcertAC,
  upcomingConcertAC,
  upcomingConcertCancelAC,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ConcertPage))
