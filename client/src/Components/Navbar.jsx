import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchArtistIdAC, fetchArtistInfoAC } from "../redux/actions/artistActions";

const Navbar = (props) => {
  const [text, setText] = useState('');

  const handleInput = e => {
    setText(e.target.value);
  };

  const onClick = async () => {
    const { fetchArtistIdAC, fetchArtistInfoAC, history, artist } = props;

    await fetchArtistIdAC(text);
    await fetchArtistInfoAC(text);

    history.push(`/artists/${artist.id}`);
  }

  return (
    <div className="Home">
      <div className="Home-header">
        <div className="NavLinks">
          <NavLink activeClassName={"Active"} exact={true} to={"/"}>
            Index
          </NavLink>
          <NavLink activeClassName={"Active"} to={"/fbpanel"}>
            FaceBook Panel
          </NavLink>
          {/* <NavLink activeClassName={"Active"} to={"/artist/:id"}> */}
          <div>
            <input
              type="text"
              value={text}
              onChange={handleInput}
            />
            <button onClick={onClick}>
              search band
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  artist: state.artist
})

const mapDispatchToProps = {
  fetchArtistIdAC,
  fetchArtistInfoAC
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Navbar)
);
