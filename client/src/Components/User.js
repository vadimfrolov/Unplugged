import React, { Component } from "react";
import dataUser from "../data/dataUser";
import { pulse } from "react-animations";
import styled, { keyframes } from "styled-components";
const Pulse = styled.div`
  animation: 5s ${keyframes`${pulse}`} infinite
`;


class User extends Component {
  render() {
    return (
      <div className="userWrapper">
        <div className="User">
          <h1>Page about {dataUser.user.name} </h1>
          <img src={dataUser.user.profilePic} alt="profile picture" />
        </div>
        <div className="userWrapper" style={{ marginTop: "5%" }}>
          <ul>
            <h2>I follow:</h2>
            {dataUser.user.follow.map(group => (
              <li>{group}</li>
            ))}
          </ul>
          <ul>
            <h2>Upcoming concerts:</h2>
            {dataUser.user.upcomingConcerts.map(concert => (
              <li>
                <span style={{ color: "blue" }}>{concert.date}</span>{" "}
                <span>{concert.group}</span>
              </li>
            ))}
          </ul>
          <ul>
            <h2>I’ve visited this concerts recently</h2>
            {dataUser.user.visitedConcerts.map(concert => (
              <li>
                <span style={{ color: "blue" }}>{concert.date}</span>{" "}
                <span>{concert.group}</span>
              </li>
            ))}
          </ul>
          <ul>
            <h2>Mostly visited:</h2>
            {dataUser.user.mostlyVisited.map(favgroup => (
              <li>
                {" "}
                <span>{favgroup.group}</span>{" "}
                <span style={{ color: "blue" }}>{favgroup.times}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="picWrapper">
    
          <Pulse><h2>Recomendations:</h2></Pulse>
          {dataUser.user.recommendations.map(reccomendation => (
            <p  style={{ margin: "20px" }}>
              {" "}
              <img
                src={reccomendation.imgSrc}
                style={{ width: "300px", borderRadius: "15px"  }}
              />{" "}
                <div> {reccomendation.group}{" "}</div> 
            </p>
          ))}
  
        </div>
      </div>
    );
  }
}

export default User;
