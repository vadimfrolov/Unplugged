import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import { withRouter, Link } from "react-router-dom";
import { parse, format } from 'date-fns'
import moment from "moment";

import "./concertPage.css";

import { fetchArtistIdAC, fetchArtistInfoAC, keepArtistNameAC } from "../../Redux/artistReducer/artistActions";
import { fetchConcertInfoAC } from "../../Redux/concertPageReducer/concertPageActions";
import {
  previousConcertAC,
  upcomingConcertAC,
  upcomingConcertCancelAC,
  previousConcertRemoveAC
} from '../../Redux/UserActivity/activityActions'

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
      concertBeen: false,
    };
  };

  componentDidMount = async () => {
    const id = this.props.match.params.id
    await this.props.fetchConcertInfoAC(id);
    this.concertActivityCheck()
    this.previousConcertActivityCheck()

  }


  convertDate = () => {
    const date = get(this.props.concertPage, "start.date")
    return new Date(date)
  }

  previousConcert = async () => {
    const formatD = format(parse(this.props.concertPage.start.date, 'yyyy-MM-dd', new Date()), 'MM.dd.yy')
    console.log('sjadhoidhfjkhoiwjqw', format);

    await this.props.previousConcertAC(
      {
        userId: this.props.user._id,
        eventName: this.props.concertPage.displayName,
        eventDate: this.props.concertPage.start.date,
        formatDate: formatD,
        eventLocation: this.props.concertPage.location,
        performers: this.props.concertPage.performance,
      },
      this.props.concertPage.id)
    this.previousConcertActivityCheck()
  }

  concertActivityCheck = () => {

    const check = this.props.user.upcomingConcerts.find((e) => {
      return e.concertId == this.props.concertPage.id
    })

    !check ?
      this.setState({ concertGo: false }) :
      this.setState({ concertGo: true });

  }

  previousConcertActivityCheck = () => {

    const check = this.props.user.previousConcerts.find((e) => {
      return e.concertId == this.props.concertPage.id
    })

    !check ?
      this.setState({ concertBeen: false }) :
      this.setState({ concertBeen: true });

  }

  upcomingConcert = async () => {
    const formatD = format(parse(this.props.concertPage.start.date, 'yyyy-MM-dd', new Date()), 'MM.dd.yy')
    await this.props.upcomingConcertAC(
      {
        userId: this.props.user._id,
        eventName: this.props.concertPage.displayName,
        eventDate: this.props.concertPage.start.date,
        formatDate: formatD,
        eventLocation: this.props.concertPage.location,
        performers: this.props.concertPage.performance,
      },
      this.props.concertPage.id)

    this.concertActivityCheck()

  }

  upcomingConcertCancel = async () => {
    await this.props.upcomingConcertCancelAC(this.props.user._id, this.props.concertPage.id)
    this.concertActivityCheck()
  }

  onClick = async (e) => {
    const name = e;
    await this.props.fetchArtistIdAC(name);
    await this.props.fetchArtistInfoAC(name);
    await this.props.keepArtistNameAC(name, this.props.artist.id)
    this.props.history.push(`/artists/${this.props.artist.id}`);
  }

  previousConcertRemove = async () => {
    await this.props.previousConcertRemoveAC(this.props.user._id, this.props.concertPage.id)
    this.previousConcertActivityCheck()
  }

  render() {
    const { concertPage } = this.props;
    const concertFlag = this.state.concertGo
    const prevFlag = this.state.concertBeen

    const id = get(concertPage, "id");
    const name = get(concertPage, "displayName");
    const date = get(concertPage, "start.date");
    const time = get(concertPage, "start.time");
    const venue = get(concertPage, "venue.displayName");
    const performers = get(concertPage, "performance");
    const location = get(concertPage, "location.city");
    const comments = get(concertPage, "comments");


    return (
      <Container style={{ marginTop: "40px", padding: "0px 30px", borderRadius: "3%" }}>
        <Row>
          <Col m={12} s={12}>
            <Card
              className="black"
              textClassName="white-text"
              title={name}
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

                        <Button className="red darken-4" onClick={this.upcomingConcert}>I'll be there!</Button> :
                        <Button className="red darken-4" onClick={this.upcomingConcertCancel}>Cancel</Button>
                      }
                    </> :
                    <>
                      {!prevFlag ?
                        <Button className="red darken-4" onClick={this.previousConcert}>I've been there!</Button> :
                        <Button className="red darken-4" onClick={this.previousConcertRemove}>Remove!</Button>
                      }
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
                    <Link style={{ color: "black" }} to={`/artists/${performers[i].id}`} value={el.displayName} onClick={() => this.onClick(el.displayName)}>
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
  fetchArtistIdAC,
  fetchArtistInfoAC,
  keepArtistNameAC,
  previousConcertRemoveAC
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ConcertPage))
