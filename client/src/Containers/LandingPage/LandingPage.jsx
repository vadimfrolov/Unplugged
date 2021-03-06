import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";
import M from "materialize-css";
import {
  Slider,
  Slide,
  Caption,
  Button,
  Icon
} from "react-materialize";

import {
  fetchArtistIdAC,
  fetchArtistInfoAC,
  keepArtistNameAC
} from "../../Redux/artistReducer/artistActions";
import { setUserAC } from "../../Redux/UserAuth/actions/userAuth";

import dataArtists from "../../Data/dataArtists";

import "./landingPage.css";

const Pulse = styled.div`
  animation: 4s ${keyframes`${fadeIn}`};
`;


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  handleClick = async e => {
    await this.setState({ text: e.target.name });
    await this.props.fetchArtistIdAC(this.state.text);
    await this.props.fetchArtistInfoAC(this.state.text);
    await this.props.keepArtistNameAC(this.state.text, this.props.artist.id)
    this.props.history.push(`/artists/${this.props.artist.id}`);
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <div className="landingPage">
        <Link to={"/explore"}>
          <div className="info">
            <p className="caption">Discover perfect concert in your city </p>
            <div className="bord">Participate in contests </div>
            <p className="bordBot">
              Choose the best live music, tailored to your music taste.
            </p>{" "}
            <Button
              waves="light"
              style={{ margin: "0px" }}
              className="bordRad red darken-4"
            >
              Find a concert
              <Icon right>music_note</Icon>
            </Button>{" "}
          </div>
        </Link>

        <Slider>
          <Slide
            image={
              <img src="https://lh6.googleusercontent.com/proxy/JOZmvGeMwd5c_Gh-A8jHjVp0yKDT4b3WCA5CuDGunX-5a0CBnBbZcblFKcm6H3mTjKNn6CWQOqx8nbmRelwDuw7S9TKJanpZVSi665F33MFjS8m4JIvxoGpd3rWWyEFv6p_p=s0-d" />
            }
          >
            <Caption placement="left">
              <p className="bigLetters">For everyone </p>
              <h4 className="capt light #d50000-text text-lighten-3" style={{ fontSize: "30px" }}>
                who loves the music
              </h4>
            </Caption>
          </Slide>
          <Slide image={<img src="http://pavbca.com/walldb/original/6/9/b/705333.jpg" />}>
            <Caption placement="right">
              <p className="bigLetters-right">Find your favourite artist</p>
              <h5 className="capt light #d50000-text text-lighten-3">
                Find Concerts
              </h5>
            </Caption>
          </Slide>
          <Slide
            image={<img src="https://www.elsetge.cat/myimg/f/26-267773_post-malone-at-the-rock-in-roma-festival.jpg" />}
          >
            <Caption placement="left">
              <p className="bigLetters">Enjoy the music</p>
              <h5 className="capt light #d50000-text text-lighten-3">Live</h5>
            </Caption>
          </Slide>
        </Slider>

        {dataArtists.artists.map(group => (
          <div className="landing-artist-div">
            <Pulse>
              <div
                className="hoverable responsive-video"
                onClick={this.handleClick}
                name={group.name}
              >
                <img
                  style={{ borderRadius: "15px" }}
                  src={group.profilePic}
                  alt="artist picture"
                  name={group.name}

                ></img>
                <div name={group.name} className="artistName">
                  {group.name}
                </div>
              </div>
            </Pulse>
          </div>
        ))}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  artist: state.artist,
  user: state.user
});

const mapDispatchToProps = {
  fetchArtistIdAC,
  fetchArtistInfoAC,
  keepArtistNameAC,
  setUserAC
};


export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LandingPage)
);
