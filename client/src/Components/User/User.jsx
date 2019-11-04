import React from "react";
import dataUser from "../../data/dataUser";
// ../../Data/dataUser
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
          {dataUser.user.follow.map((group,i) => (
            <li key={i}>{group}</li>
          ))}
        </ul>
        <ul>
          <h2>Upcoming concerts:</h2>
          {dataUser.user.upcomingConcerts.map((concert,i) => (
            <li key={i}>
              <span style={{ color: "blue" }}>{concert.date}</span>
              <span>{concert.group}</span>
            </li>
          ))}
        </ul>
        <ul>
          <h2>I’ve visited this concerts recently</h2>
          {dataUser.user.visitedConcerts.map((concert, i) => (
            <li key={i}>
              <span style={{ color: "blue" }}>{concert.date}</span>
              <span>{concert.group}</span>
            </li>
          ))}
        </ul>
        <ul>
          <h2>Mostly visited:</h2>
          {dataUser.user.mostlyVisited.map((favgroup, i) => (
            <li key={i}>
              <span>{favgroup.group}</span>
              <span style={{ color: "blue" }}>{favgroup.times}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="picWrapper">
        <h2>Recomendations:</h2>
        {dataUser.user.recommendations.map((recommendation, i) => (
          <p style={{ margin: "20px" }} key={i}>
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
