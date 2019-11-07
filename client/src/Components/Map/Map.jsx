import React, { Component } from "react";
import { Map as GoogleMap, GoogleApiWrapper, Marker } from "google-maps-react";
import { connect } from "react-redux";

import Loader from 'react-loader-spinner'

import {
  fetchPastDates,
  fetchPastDatesAC,
  fetchDate
} from "../../Redux/concertsReducer/concertsActions";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

let iconPin = {
  path: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
  fillColor: "red",
  fillOpacity: 1,
  scale: 0.0125 //to reduce the size of icons
};

require("dotenv").config();
const mapKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;

const mapStyles = {
  marginTop: "20px",
  width: "1600px",
  height: "700px"
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      geoposition: null
    };
  }

  componentDidMount = async () => {
    await this.geoInfo();
    this.getLocation();
  };

  geoInfo = async () => {
    const id = this.props.match.params.id;

    const lat = "lat";
    let page = 1;
    const dates = [];
    const cord = [];
    let res = await this.props.fetchPastDates(id, page);

    while (res) {
      await this.props.fetchPastDatesAC(res);
      await this.props.fetchPastDates(id, page);
      page++;
      res.forEach(e => dates.push(e));
      res = await this.props.fetchPastDates(id, page);
    }
    const eventDates = dates.filter(function(item, pos) {
      return dates.indexOf(item) == pos;
    });

    for (let i = 0; i < eventDates.length; i += 1) {
      await this.props.fetchDate(id, eventDates[i]);

      this.props.concerts.events.forEach(e => {
        cord.push(e.location);
      });
    }

    const unique = (cord, lat) => {
      return cord.filter(
        (e, i) => cord.findIndex(a => a[lat] === e[lat]) === i
      );
    };

    this.setState({ stores: unique(cord, lat) });
  };

  geoSuccess = pos => {
    let crd = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    this.setState({ geoposition: crd });
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess);
    } else {
      console.log(
        "Geolocation is not supported for this Browser/OS version yet."
      );
    }
  };

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          icon={iconPin}
          position={{
            lat: store.lat,
            lng: store.lng
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  render() {
    return (
      <div>
        {!this.state.geoposition ? (
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '80vh'}}>
            {" "}
            <Loader
              type="Ball-Triangle"
              color="#8b0000"
              height={100}
              width={100}
              timeout={29000} //3 secs
            />
          </div>
        ) : (
          <GoogleMap
            google={this.props.google}
            zoom={4}
            style={mapStyles}
            initialCenter={this.state.geoposition}
          >
            {this.displayMarkers()}
          </GoogleMap>
        )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPastDates: (id, page) => dispatch(fetchPastDates(id, page)),
    fetchPastDatesAC: arr => dispatch(fetchPastDatesAC(arr)),
    fetchDate: (id, year) => dispatch(fetchDate(id, year))
  };
}

function mapStateToProps(store) {
  return {
    artist: store.artist,
    concerts: store.concerts
  };
}

const MapContainer = GoogleApiWrapper({ apiKey: mapKey })(Map);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
