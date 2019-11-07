import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import { withRouter, Link } from "react-router-dom";

import "./concertPage.css";

import { fetchConcertInfoAC } from "../../Redux/concertPageReducer/concertPageActions";
import { previousConcertAC, upcomingConcertAC, upcomingConcertCancelAC } from '../../Redux/UserActivity/activityActions'

import Flashmob from "../../Components/Flashmob";
import CommentConcert from "../../Components/CommentsConcert";
import CommentList from "../../Components/CommentsConcert/CommentList";

import {
  Row,
  Col,
  Card,
  Button
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
      <div className="cardPage">
        <Row>
          <Col m={8} s={12}>
            <Card
              className="black"
              textClassName="white-text"ç
              title={name}
              actions={[
                this.convertDate() > Date.now() ?
                  <>
                    {!concertFlag ?
                      <Button className="red darken-4" onClick={this.upcomingConcert}>I'll be there!</Button> :
                      <Button className="red darken-4" onClick={this.upcomingConcertCancel}>Cancel</Button>
                    }
                  </> :
                  <>
                    <Button className="red darken-4" onClick={this.previousConcert}>I've been there!</Button>
                  </>
              ]}
            >
              <p className="pointConcert" >
                <span className="red-text ">When:</span> {date} {time}
              </p>
              <p>
                <span className="red-text ">Where: </span>
                {venue}, {location},
              </p>
              <span className="red-text t">Perfomers:</span>

              {performers &&
                performers.map((el, i) => (
                  <li className="perfomersList" key={`${name}_${i}`}>
                    <Link to={`/artists/${performers[i].id}`}>
                      {el.displayName}
                    </Link>
                  </li>
                ))}

            </Card>
          </Col>
        </Row>

        {/* <p>
          {name},{date},{time},{venue},{location},
          {performers &&
            performers.map((el, i) => (
              <p key={`${name}_${i}`}>
                <Link to={`/artists/${performers[i].id}`}>
                  {el.displayName}
                </Link>
              </p>
            ))}
        </p>
        <button>I'll be there!</button> */}
        <Flashmob />
        <CommentConcert nameArtist={performers} idConcert={id} />
        <CommentList comments={comments} />
      </div>
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
