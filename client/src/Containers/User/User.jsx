import React, { Component } from "react";
import axios from "axios";
import Sky from "react-sky";
import { connect } from "react-redux";
import dataUser from "../../Data/dataUser";
import { Icon, Button } from "react-materialize";
import UserContent, {userContent} from './UserContent'

import "./user.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: this.props.user,
      prevConcerts: null,
      upcomingConcerts: null
    };
  }

  userActivity = () => {
    const sortUpcomingConc = this.props.user.user.upcomingConcerts.sort((a, b) => a.date >b.date ? 1 : -1)
    const sortPrevConc = this.props.user.user.upcomingConcerts.sort((a, b) => a.date >b.date ? 1 : -1)
    this.setState({prevConcerts: sortPrevConc, sortPrevConc: sortUpcomingConc})
  }

  // callAPI = async () => {
  //   const user = await axios.get("http://localhost:9000/testAPI");
  //   this.setState({
  //     user: user.data,
  //     // group: user.data.favouriteGroups,
  //     // newConcerts: user.data.upcomingConcerts,
  //     // lastConcerts: user.data.previousConcerts
  //   });
  //   // console.log(new Date(this.state.lastConcerts[0].date));
  // };

  render() {
    return (
      <div>
        {!this.props.user.user ? (
          <></>
        ) : ( <UserContent user={this.props.user} />
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

//
export default connect(
  mapStateToProps,
  null
)(User);
