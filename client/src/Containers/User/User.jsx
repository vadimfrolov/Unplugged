import React, { Component } from "react";
import MusicPlayer from "../../Components/MusicPlayer/MusicPlayer";
import axios from "axios";
import Sky from "react-sky";

import "./user.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {}, group: [], newConcerts: [{}], lastConcerts: [{}] };
  }

  callAPI = async () => {
    const user = await axios.get("http://localhost:9000/testAPI");
    this.setState({
      user: user.data,
      group: user.data.favouriteGroups,
      newConcerts: user.data.upcomingConcerts,
      lastConcerts: user.data.previousConcerts
    });
    console.log(new Date(this.state.lastConcerts[0].date));
  };

  componentDidMount() {
    this.callAPI(this.state.lastConcerts);
  }

  render() {
    const { username, userPic } = this.state.user;

    return (
      <div className="userWrapper">
        <Sky
          images={{
            /* FORMAT AS FOLLOWS */

            0: "http://icons.iconarchive.com/icons/iconsmind/outline/512/Hipster-Headphones-icon.png",
            1: "https://cdn2.iconfinder.com/data/icons/electronics-technology-2/33/cassette-512.png",
            2: "https://images.vexels.com/media/users/3/145816/isolated/preview/7616b64374d1ecc318e9d638807c4d61-rock-music-sign-logo-by-vexels.png"
          }}
          how={
            130
          } /* Pass the number of images Sky will render chosing randomly */
          time={40} /* time of animation */
          size={"120px"} /* size of the rendered images */
          background={"#4593a8"} /* color of background */
        />

        <div className="avatar">
          <div className="User"> {username} </div>
          <img src={userPic} alt="profile picture" />
        </div>
        <div>
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
        </div>
      </div>
    );
  }
}

//

export default User;
