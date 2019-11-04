import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import get from "lodash.get";

import Home from "../Home";
import FaceBookPanel from "../../Components/FacebookPanel";
import Navbar from "../../Components/Navbar";
import LandingPage from "../LandingPage/LandingPage";
import ArtistPage from "../ArtistPage/ArtistPage";
import Login from '../../Components/User/login'
import Registration from '../../Components/User/registration'
import User from "../User/User";
import ConcertYear from "../../Components/Concert-by-artist/ConcertYear";

import "./styles.css";

class App extends React.Component {
  render() {
    const id = get(this.props, "artist.id");

    return (
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration}/>
            <Route path={`/dashboard`} component={User} />
            <Route path="/fbpanel" component={FaceBookPanel} />
            <Route path="/landing" component={LandingPage} />
            <Route path={`/artists/:id`} component={ArtistPage} />
            <Route path={`/concerts/:id`} component={ConcertYear} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  artist: store.artist
});

export default connect(mapStateToProps)(App);
