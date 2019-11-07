import React, { Component } from "react";
import { parse, toDate } from 'date-fns'
import dataUser from "../../Data/dataUser";
import { Icon, Button } from "react-materialize";

import "./user.css";

class UserContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      prevConcerts: null,
      upcomingConcerts: null
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

  // callAPI = async () => {
  //   const user = await axios.get("http://localhost:9000/testAPI");
  //   this.setState({
  //     user: user.data,
  //     // group: user.data.favouriteGroups,
  //     // newConcerts: user.data.upcomingConcerts,
  //     // lastConcerts: user.data.previousConcerts
  //   });
  //   // console.log(new Date(this.state.lastConcerts[0].date));
  // };

  render() {
    const { username } = this.state.user;

    return (
      <div className="avatarWrapper">
        {JSON.stringify(this.props.user.user.username)}

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
          {/* <img src={userPic} alt="profile picture" /> */}
        </div>
        <div className="userWrapper" style={{ marginTop: "5%" }}>
          <div className="blockUser">
            <ul>
              <h2 className="red-text">I follow:</h2>

              {this.props.user.user.favouriteGroups.map(group => (
                <li>{group.artist}</li>
              ))}
            </ul>
            <Button waves="light" className="bordRad deep-orange accent-4 ">
              show all
                </Button>
          </div>
          <div className="blockUser">
            <ul>
              <h2 className="red-text">Upcoming concerts:</h2>
              {this.state.user.user.upcomingConcerts.map(concert => (
                <li >
                  <span style={{ color: "red", paddingLeft: "10px" }}>
                    {concert.formatDate}
                  </span>
                  <li style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}> {concert.group}</li>
                </li>
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
              {this.state.user.user.previousConcerts.map(concert => (
                <li>
                  <span style={{ color: "red", marginLeft: "10px" }}>
                    {concert.formatDate}
                  </span>
                  <li style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}> {concert.group}</li>
                </li>
              ))}
            </ul>
            <Button waves="light" className="bordRad deep-orange accent-4 ">
              show all
                </Button>
          </div>
          {/* <div className="blockUser">
                <ul>
                  <h2>Mostly visited:</h2>
                  {dataUser.user.mostlyVisited.map(favgroup => (
                    <li>
                      <span>{favgroup.group}</span>
                      <span style={{ color: "black" }}>{favgroup.times}</span>
                    </li>
                  ))}
                </ul>
              </div> */}
        </div>
        <h2 className="rec">Recommendations:</h2>
        <div className="picWrapper">
          {dataUser.user.recommendations.map(recommendation => (
            <p style={{ margin: "20px" }}>
              <img
                src={recommendation.imgSrc}
                style={{ width: "300px", borderRadius: "15px" }}
              />
              <div className="rec"> {recommendation.group}</div>
            </p>
          ))}
        </div>
        {/* <div>
          <div className="Block">
            <p className="selected">I follow:</p>
            <span className="groupConcert">
              {this.state.group.map(function(item, i) {
                return <p key={i}>{item}</p>;
              })}
            </span>
          </div>
          <div className="Block">
            <p className="selected">Upcoming concerts:</p>

            <table className="table">
              {this.state.newConcerts.map(function(item, i) {
                return (
                  <tr>
                    <td>
                      <span className="dateConcert">
                        {new Date(item.date).toUTCString().slice(0, 16)}{" "}
                      </span>
                    </td>
                    <td>
                      <span className="groupConcert">{item.group}</span>
                    </td>
                    <td>{item.location}</td>
                  </tr>
                );
              })}
            </table>    
          </div>
          <div className="Block">
            <p className="selected">I’ve visited this concerts recently</p>
            <table className="table">
              {this.state.lastConcerts.map(function(item, i) {
                return (
                  <tr>
                    <td>
                      <span className="dateConcert">
                        {new Date(item.date).toUTCString().slice(0, 16)}{" "}
                      </span>
                    </td>
                    <td>
                      <span className="groupConcert">{item.group}</span>
                    </td>
                    <td>{item.location}</td>
                  </tr>
                );
              })}
            </table>

          </div>
          <div className="Block">
            <p className="selected">Mostly visited: </p>
            <p className="selected"> Recomendations:</p>
          </div>
        </div> */}}
      </div>
    );
  }
}


//
export default UserContent
