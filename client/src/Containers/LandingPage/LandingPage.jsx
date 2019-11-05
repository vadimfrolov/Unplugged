import React, { Component } from "react";
import { fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";
import dataArtists from "../../Data/dataArtists";
import M from "materialize-css";
import { Slider, Slide, Caption, Button, Icon } from "react-materialize";
import "./landingPage.css";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  fetchArtistIdAC,
  fetchArtistInfoAC
} from "../../Redux/artistReducer/artistActions";
import { setUserAC } from "../../Redux/UserAuth/actions/userAuth";


const Pulse = styled.div`
  animation: 5s ${keyframes`${fadeIn}`};
`;

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  componentDidMount() {
    this.checkSession();
  }

  checkSession = async () => {
    const response = await fetch("/users/getsession/");
    const user = await response.json();
    this.props.setUserAC({ user: user });
  };

  componentDidUpdate(prevProps) {
    if (this.props.artist && prevProps.artist !== this.props.artist) {
      this.props.history.push(`/artists/${this.props.artist.id}`);
    }
  }

  // handleDiv = e => {
  //   this.setState({ text: e.target.value });
  //   console.log(e.target)
  // };

  handleClick = async e => {
    // console.dir(e);
    console.log(e.target.name);
    await this.setState({ text: e.target.name });
    await this.props.fetchArtistIdAC(this.state.text);
    await this.props.fetchArtistInfoAC(this.state.text);
  };



  render() {
    return (
      <div className="landingPage">
        <div className="info">
          <p className="caption">Discover perfect concert in your city </p>
          <div className="bord">Participate in contests </div>
          <p className="bordBot">Choose the best live music, tailored to your music taste.</p>
          <Button waves="light" className="bordRad deep-orange accent-4 ">
            Find a concert
            <Icon right>music_note</Icon>
          </Button>
        </div>

        <Slider>
          <Slide
            image={
              <img src="https://www.wallpaperup.com/uploads/wallpapers/2014/03/19/302666/355c1d5fb827c8b94b37ca8e59f81a16.jpg" />
            }
          >
            <Caption placement="left">
              <p className="bigLetters">For everyone who loves the music</p>
              <h5 className="capt light #d50000-text text-lighten-3">

              </h5>
            </Caption>
          </Slide>
          <Slide
            image={
              <img src="https://images.wallpaperscraft.com/image/guitarist_musician_concert_122198_3840x2400.jpg" />
            }
          >
            <Caption placement="right">
              <p className="bigLetters">Find your favourite artist</p>
              <h5 className="capt light #d50000-text text-lighten-3">
                Find Concerts
              </h5>
            </Caption>
          </Slide>
          <Slide
            image={
              <img src="https://hdwallsbox.com/wallpapers/l/1920x1080/73/trent-reznor-band-black-and-white-concert-1920x1080-72962.jpg" />
            }
          >
            <Caption placement="left">
              <p className="bigLetters">Enjoy the music</p>
              <h5 className="capt light #d50000-text text-lighten-3">Live</h5>
            </Caption>
          </Slide>
        </Slider>

        {dataArtists.artists.map(group => (
          <div style={{ margin: "40px" }}>
            <Pulse>
              <div onClick={this.handleClick} name={group.name}>
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
  setUserAC
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LandingPage)
);

