import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import get from "lodash.get";

import Home from "../Home";
import FaceBookPanel from "../../Components/FacebookPanel";
import Navbar from "../../Components/Navbar";
import LandingPage from "../LandingPage";
import ArtistPage from "../ArtistPage";
import ConcertPage from "../ConcertPage";
import Login from "../../Components/User/login";
import Registration from "../../Components/User/registration";
import User from "../User/User";
import ConcertYear from "../../Components/Concert-by-artist/ConcertYear";
import ConcertExplore from "../../Components/ConcertExplore";
import DateConcerts from "../../Components/DateConcerts";
import MapContainer from "../../Components/Map/Map";

import "./styles.css";

class App extends React.Component {
  render() {
    const id = get(this.props, "artist.id");

    return (
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration}/>
            <Route path={`/dashboard`} component={User} />
            <Route path="/fbpanel" component={FaceBookPanel} />
            <Route path="/landing" component={LandingPage} />
            <Route path={`/artists/:id`} component={ArtistPage} />
            <Route path={`/concerts/:id`} component={ConcertYear} />
            <Route path={`/concert/:id`} component={ConcertPage} />
            <Route exact path="/explore" component={ConcertExplore} />
            <Route path={`/explore/:id`} component={DateConcerts} />
            <Route path='/map/:id' component={MapContainer}/>
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
