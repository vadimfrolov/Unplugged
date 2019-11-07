import React, { Component } from "react";
import dataUser from "../../Data/dataUser";
import { Button } from "react-materialize";
import { Link } from "react-router-dom";
import UserMapContainer from '../../Components/UserGeo/UserMap'

import "./user.css";

class UserContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      prevConcerts: null,
      upcomingConcerts: null,
      mapFlag: null,
    };
  }

  componentDidMount = () => {
    this.userActivity()
  }

  userActivity = () => {
    const sortUpcomingConc = this.props.user.user.upcomingConcerts.sort((a, b) => a.date > b.date ? 1 : -1)
    const sortPrevConc = this.props.user.user.upcomingConcerts.sort((a, b) => a.date > b.date ? 1 : -1)
    this.setState({ prevConcerts: sortPrevConc, sortPrevConc: sortUpcomingConc })
  }


  render() {
    const { username } = this.state.user;

    return (
      <div className="avatarWrapper">
        <div className="avatar">
          <div
            className="User"
            style={{ fontSize: "50px", fontWeight: "600" }}
          >
            {" "}
            {username}{" "}
          </div>
          <img
            src={dataUser.user.profilePic}
            style={{ width: "150px" }}
            alt="profile picture"
          />
        </div>
        <div className="userWrapper" style={{ marginTop: "5%" }}>
          <div className="blockUser">
            <ul>
              <h2 className="red-text">I follow:</h2>

              {this.props.user.user.favouriteGroups.slice(-7).map(group => (
                <Link to={`/artist/${group.id}`}>
                  <li>{group.artist}</li>
                </Link>
              ))}
            </ul>
            <Button waves="light" className="bordRad deep-orange accent-4 ">
              show all
                </Button>
          </div>
          <div className="blockUser">
            <ul>
              <h2 className="red-text">Upcoming concerts:</h2>
              {this.state.user.user.upcomingConcerts.slice(-3).map(concert => (
                <Link to={`/concert/${concert.concertId}`}>
                  <li >
                    <span style={{ color: "red", paddingLeft: "10px" }}>
                      {concert.formatDate}
                    </span>
                    <li style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}> {concert.group}</li>
                  </li>
                </Link>
              ))}
            </ul>
            <Button waves="light" className="bordRad deep-orange accent-4 ">
              show all
                </Button>
          </div>
          <div className="blockUser">
            <ul>
              <h2 className="red-text">
                I’ve visited this concerts recently
                  </h2>
              {this.state.user.user.previousConcerts.slice(-3).map(concert => (
                <Link to={`/concert/${concert.concertId}`}>
                  <li>
                    <span style={{ color: "red", marginLeft: "10px" }}>
                      {concert.formatDate}
                    </span>
                    <li style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}> {concert.group}</li>
                  </li>
                </Link>))}
            </ul>
            <Button waves="light" className="bordRad deep-orange accent-4 ">
              show all
                </Button>
          </div>
        </div>
        <h2 className="rec">User Geo:</h2>

        <UserMapContainer user={this.props.user} />

      </div>
    );
  }
}


//
export default UserContent
