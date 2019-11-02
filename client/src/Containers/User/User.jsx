import React from "react";
import dataUser from "../../Data/dataUser";

const User = () => {
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
              <span style={{ color: "blue" }}>{concert.date}</span>
              <span>{concert.group}</span>
            </li>
          ))}
        </ul>
        <ul>
          <h2>I’ve visited this concerts recently</h2>
          {dataUser.user.visitedConcerts.map(concert => (
            <li>
              <span style={{ color: "blue" }}>{concert.date}</span>
              <span>{concert.group}</span>
            </li>
          ))}
        </ul>
        <ul>
          <h2>Mostly visited:</h2>
          {dataUser.user.mostlyVisited.map(favgroup => (
            <li>
              <span>{favgroup.group}</span>
              <span style={{ color: "blue" }}>{favgroup.times}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="picWrapper">
        <h2>Recomendations:</h2>
        {dataUser.user.recommendations.map(recommendation => (
          <p style={{ margin: "20px" }}>
            <img
              src={recommendation.imgSrc}
              style={{ width: "300px", borderRadius: "15px" }}
            />
            <div> {recommendation.group}</div>
          </p>
        ))}
      </div>
    </div>
  );
};

export default User;
