import React, { Component } from "react";
import dataUser from "../../Data/dataUser";
import { Button, Icon } from "react-materialize";
import { Link } from "react-router-dom";
import UserMapContainer from "../../Components/UserGeo/UserMap";
//

import "./user.css";

class UserContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      prevConcerts: null,
      upcomingConcerts: null,
      mapFlag: null
    };
  }

  componentDidMount = () => {
    this.userActivity();
  };

  userActivity = () => {
    const sortUpcomingConc = this.props.user.user.upcomingConcerts.sort(
      (a, b) => (a.date > b.date ? 1 : -1)
    );
    const sortPrevConc = this.props.user.user.upcomingConcerts.sort((a, b) =>
      a.date > b.date ? 1 : -1
    );
    this.setState({
      prevConcerts: sortPrevConc,
      sortPrevConc: sortUpcomingConc
    });
  };

  render() {
    const { username } = this.state.user;

    return (
      <div>
        <div className="avatarWrapper">
          <div className="avatarMap">
            <div className="avatar">
              <img
                src={dataUser.user.profilePic}
                className="userAvatar"
                alt="profile picture"
              />
              <p className="User">{this.props.user.user.username}</p>
            </div>
            <div className="geo">
              <p className="geoBlock white-text" >User Geo:</p>
              <UserMapContainer user={this.props.user} />
            </div>
          </div>

          <div className="userWrapper" style={{ marginTop: "5%" }}>
            <div className="blockUser">
              <ul>
                <h2 className="userHead red-text">I follow:</h2>

                {this.props.user.user.favouriteGroups.slice(-7).map(group => (
                  <Link to={`/artist/${group.id}`}>
                    <li>{group.artist}</li>
                  </Link>
                ))}
              </ul>
              <Button waves="light" className="bordRad deep-orange accent-4 ">
                show all <Icon right>zoom_out_map</Icon>
              </Button>
            </div>
            <div className="blockUser">
              <ul>
                <h2 className="userHead red-text">Upcoming concerts:</h2>
                {this.state.user.user.upcomingConcerts
                  .slice(-3)
                  .map(concert => (
                    <li>
                      <li
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {" "}
                        <span style={{ color: "red", marginRight: "5%" }}>
                          {concert.formatDate}
                        </span>
                        {concert.group}
                      </li>
                    </li>
                  ))}
              </ul>
              <Button waves="light" className="bordRad deep-orange accent-4 ">
                show all <Icon right>zoom_out_map</Icon>
              </Button>
            </div>
            <div className="blockUser">
              <ul>
                <h2 className="userHead red-text">
                  I’ve visited this concerts recently:
                </h2>
                {this.state.user.user.previousConcerts
                  .slice(-3)
                  .map(concert => (
                    <li>
                      <li
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap"
                        }}
                      >
                        {" "}
                        <span style={{ color: "red", marginRight: "5%" }}>
                          {concert.formatDate}
                        </span>
                        {concert.group}
                      </li>
                    </li>
                  ))}
              </ul>
              <Button waves="light" className="bordRad deep-orange accent-4 ">
                show all <Icon right>zoom_out_map</Icon>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//
export default UserContent;
