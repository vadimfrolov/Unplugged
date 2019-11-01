import React, { Component } from "react";
import dataArtists from "../data/dataArtists";

import { fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";

const Pulse = styled.div`
  animation: 15s ${keyframes`${fadeIn}`}
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
                  src={group.profilePic} alt='artist picture'
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
