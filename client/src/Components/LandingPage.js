import React, { Component } from "react";
import dataArtists from "../data/dataArtists";

import { pulse } from "react-animations";
import styled, { keyframes } from "styled-components";

const Pulse = styled.div`
  animation: 3s ${keyframes`${pulse}`} infinite;
`;

class LandingPage extends Component {
  render() {
    return (
      <div  className="landingPage">
        {/* <h3>Top 10 Artists</h3> */}
        {dataArtists.artists.map(group => (
          <div style={{ margin: "20px" }}>
            <Pulse>
              {" "}
              <div>
                {" "}
                <img
                  style={{ borderRadius: "15px" }}
                  src={group.profilePic}
                />{" "}
              </div>
        
            <div>{group.name} </div>    </Pulse>
          </div>
        ))}
      </div>
    );
  }
}

export default LandingPage;
