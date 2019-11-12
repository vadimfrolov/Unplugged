import React, { Component } from "react";
import { connect } from "react-redux";

import UserContent from './UserContent';

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


export default connect(
  mapStateToProps,
  null
)(User);
