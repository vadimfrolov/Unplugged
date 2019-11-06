import React, { Component } from "react";
import { connect } from 'react-redux';
import get from 'lodash.get';
import { withRouter, Link } from 'react-router-dom';

import { fetchConcertInfoAC } from "../../Redux/concertPageReducer/concertPageActions";
import { previousConcertAC, upcomingConcertAC, upcomingConcertCancelAC } from '../../Redux/UserActivity/activityActions'

import Flashmob from "../../Components/Flashmob";
import CommentSection from "../../Components/CommentsConcert";
import CommentList from "../../Components/CommentsConcert/CommentList";


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
      <div>
        <p>{name},
        {date},
        {time},
        {venue},
        {location},
        {performers && performers.map(
          (el, i) => (
            <p key={`${name}_${i}`}>
              <Link to={`/artists/${performers[i].id}`}>
                {el.displayName}
              </Link>
            </p>
          ))}
        </p>
        {!date ?
          <></> :
          <>
            {this.convertDate() > Date.now() ?
              <>
                {!concertFlag ?
                  <button onClick={this.upcomingConcert}>I'll be there!</button> :
                  <button onClick={this.upcomingConcertCancel}>Cancel</button>
                }
              </> :
              <>
                {id}
                <button onClick={this.previousConcert}>I've been there!</button>
              </>
            }
          </>
        }
        <Flashmob />
        <CommentSection nameArtist={performers} idConcert={id} />
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
)(withRouter(ConcertPage));
