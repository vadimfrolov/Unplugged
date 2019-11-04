import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserAC } from '../../Redux/UserAuth/actions/userAuth'

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

    registration = async () => {
      const data = this.state;
      const response = await fetch('/users/registration/', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: data }),
      });
      const user = await response.json();
      this.props.setUser(user);
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

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch(setUserAC(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)