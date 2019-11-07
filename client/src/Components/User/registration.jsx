import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  registrationAC } from '../../Redux/UserAuth/actions/userAuth'

class Registration extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: null,
        username: null,
        password: null,
      }
    };

    onChangeEmail = (e) => {
      this.setState({ email: e.target.value })
    }

    onChangeUsername = (e) => {
      this.setState({ username: e.target.value })
    }
    onChangePassword = (e) => {
      this.setState({ password: e.target.value })
    }

    registration = () => {
      this.props.registrationAC(this.state)
    }

    render() {
      return (
        <div>
          <input placeholder='email' onChange={this.onChangeEmail}></input>
          <input placeholder='login' onChange={this.onChangeUsername}></input>
          <input placeholder='password' type='password' onChange={this.onChangePassword}></input>
          <button onClick={this.registration}>registration</button>
        </div>
      )
    }
  }

function mapStateToProps(store) {
  return {
    user: store.user
  }
}

const mapDispatchToProps = {
  registrationAC
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration)