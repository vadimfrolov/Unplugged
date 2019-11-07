import React, { Component } from 'react';
import { Map as GoogleMap, GoogleApiWrapper, Marker } from 'google-maps-react';
import { connect } from "react-redux";

import {
  fetchPastDates,
  fetchPastDatesAC,
  fetchDate
} from "../../Redux/concertsReducer/concertsActions";


let iconPin = {
  path: 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z',
  fillColor: 'red',
  fillOpacity: 1,
  scale: 0.0125, //to reduce the size of icons
 };

 require("dotenv").config();
 const mapKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;


const mapStyles = {
  width: '50%',
  height: '50%',
};

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      geoposition: null
    }
  }


  componentDidMount = async () => {
    await this.geoInfo();
    this.getLocation();
  }

  geoInfo = async () => {
  
  }

  geoSuccess = (pos) => {
    let crd = { lat: pos.coords.latitude, lng: pos.coords.longitude };
    this.setState({ geoposition: crd })
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess);
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
    }
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} icon={iconPin} position={{
        lat: store.lat,
        lng: store.lng
      }}
        onClick={() => console.log("You clicked me!")} />
    })
  }



  render() {
    return (
      <div>
        {!this.state.geoposition?
          <div>loading</div> :
          <GoogleMap
            google={this.props.google}
            zoom={4}
            style={mapStyles}
            initialCenter={this.state.geoposition} >
            {this.displayMarkers()}
          </GoogleMap>
        }
      </div>
    )
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
    concerts: store.concerts,
    user: store.user.user
  };
}

const UserMapContainer = GoogleApiWrapper({ apiKey: mapKey })(Map)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMapContainer);

