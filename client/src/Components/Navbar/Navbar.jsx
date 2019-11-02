import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchArtistIdAC,
  fetchArtistInfoAC
} from "../../Redux/actions/artistActions";

import Youtube from "../Youtube/Youtube"

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.artist && prevProps.artist !== this.props.artist) {
      this.props.history.push(`/artists/${this.props.artist.id}`);
    }
  }

  handleInput = e => {
    this.setState({ text: e.target.value });
  };

  onClick = async () => {
    await this.props.fetchArtistIdAC(this.state.text);
    await this.props.fetchArtistInfoAC(this.state.text);
  }

  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <div className="NavLinks">
            <NavLink activeClassName={"Active"} exact={true} to={"/"}>
              Index
          </NavLink>
            <NavLink activeClassName={"Active"} to={"/fbpanel"}>
              FBpanel
          </NavLink>
          <NavLink activeClassName={"Active"} to={"/dashboard"}>
            dashboard
          </NavLink>
          <Youtube />
          <div>
              <input name="bandInput" type="text" value={this.state.text} onChange={this.handleInput} />
              <button onClick={this.onClick}> search band </button>
            </div>
       
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  artist: state.artist
});

const mapDispatchToProps = {
  fetchArtistIdAC,
  fetchArtistInfoAC
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
