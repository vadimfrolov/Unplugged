import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash.get";
import { parse, format } from 'date-fns'

import {
  Button,
} from "react-materialize";

import "../../Containers/ConcertPage/concertPage.css";

import {
  previousConcertAC,
  upcomingConcertAC,
  upcomingConcertCancelAC,
  previousConcertRemoveAC
} from '../../Redux/UserActivity/activityActions'


class GoButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concertGo: false,
      concertBeen: false,
    };
  };

  componentDidMount = async () => {
    this.concertActivityCheck()
    this.previousConcertActivityCheck()
  }

  convertDate = () => {
    const date = get(this.props.concertPage, "start.date")
    return new Date(date)
  }

  previousConcert = async () => {
    const formatD = format(parse(this.props.concertPage.start.date, 'yyyy-MM-dd', new Date()), 'MM.dd.yy')

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

  previousConcertRemove = async () => {
    await this.props.previousConcertRemoveAC(this.props.user._id, this.props.concertPage.id)
    this.previousConcertActivityCheck()
  }


  render() {
    const concertFlag = this.state.concertGo
    const prevFlag = this.state.concertBeen
    return (
      this.convertDate() > Date.now() ?
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
        </>
    );
  }
}


const mapStateToProps = store => ({
  user: store.user.user,
});

const mapDispatchToProps = {
  previousConcertAC,
  upcomingConcertAC,
  upcomingConcertCancelAC,
  previousConcertRemoveAC
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoButton)
