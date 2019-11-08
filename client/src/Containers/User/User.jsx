import React, { Component } from "react";
import axios from "axios";
import Sky from "react-sky";
import { connect } from "react-redux";
import dataUser from "../../Data/dataUser";
import { Icon, Button } from "react-materialize";

import "./user.css";

// !!!!! Подключение юзера !!!
// import UserComponent from "../../Components/UserComponent/UserComponent";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { user: this.props.user };
  }

  render() {
    const { username } = this.state.user;

    return (
      <div>
        {!this.props.user.user ? (
          <></>
        ) : (
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
       
            </div>
            <div className="userWrapper" style={{ marginTop: "5%" }}>
              <div className="blockUser">
                <ul>
                  <h2 className="red-text">I follow:</h2>

                  {dataUser.user.follow.map(group => (
                    <li>{group}</li>
                  ))}
                </ul>
                <Button waves="light" className="bordRad deep-orange accent-4 ">
                  show all
                </Button>
              </div>
              <div className="blockUser">
                <ul>
                  <h2 className="red-text">Upcoming concerts:</h2>
                  {dataUser.user.upcomingConcerts.map(concert => (
                    <li>
                      <span style={{ color: "red", paddingLeft: "10px" }}>
                        {concert.date}
                      </span>
                      <span> {concert.group}</span>
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
                  {dataUser.user.visitedConcerts.map(concert => (
                    <li>
                      <span style={{ color: "red", marginLeft: "10px" }}>
                        {concert.date}
                      </span>
                      <span> {concert.group}</span>
                    </li>
                  ))}
                </ul>
                <Button waves="light" className="bordRad deep-orange accent-4 ">
                  show all
                </Button>
              </div>
            </div>

            {/* !!!!! Подключение юзера !!! */}
            {/* <UserComponent/> */}


         
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

//
export default connect(
  mapStateToProps,
  null
)(User);
