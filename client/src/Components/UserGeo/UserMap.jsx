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
  width: '60%',
  height: '25%',
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
    return this.props.user.previousConcerts.map((store, index) => {
      return <Marker key={index} name={'Dolores park'} id={index} icon={iconPin} title={store.group} position={{
        lat: store.location.lat,
        lng: store.location.lng
      }}
        onClick={() => this.props.history.push(`/concert/${store.id}`)} 
        />
    })
  }



  render() {
    return (
      <div>
        {!this.state.geoposition?
          <div>loading</div> :
          <div>
          <GoogleMap
            google={this.props.google}
            zoom={3}
            style={mapStyles}
            initialCenter={this.state.geoposition} >
            {this.displayMarkers()}
          </GoogleMap>
          </div>
        }
      </div>
    )
  }
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
  null
)(UserMapContainer);

