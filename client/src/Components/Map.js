import React, { Component } from 'react';

import { Map as GoogleMap, GoogleApiWrapper, Marker, ClusterMarker } from 'google-maps-react';


const mapStyles = {
  width: '50%',
  height: '50%',
};

class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stores:
        [{ lat: 47.49855629475769, lng: -122.14184416996333 },
        { latitude: 47.359423, longitude: -122.021071 },
        { latitude: 47.2052192687988, longitude: -121.988426208496 },
        { latitude: 47.6307081, longitude: -122.1434325 },
        { latitude: 47.3084488, longitude: -122.2140121 },
        { latitude: 47.5524695, longitude: -122.0425407 }]
    }
  }

  geoSuccess = (pos) => {
    let crd = { lat: pos.coords.latitude, lng: pos.coords.latitude };
    console.log(crd);

  }

  displayMarkers = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess);
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
    }
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
        lat: store.latitude,
        lng: store.longitude
      }}
        onClick={() => console.log("You clicked me!")} />
    })
  }



  render() {
    return (
      <GoogleMap
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.3084488, lng: -122.176 }} >
        {this.displayMarkers()}
      </GoogleMap>

    )
  }
}

export default GoogleApiWrapper({ apiKey: 'AIzaSyBw-qA13bP-4MGidqVTeRrtiqvqkA0InuM' })(Map);