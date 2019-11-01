import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserAC } from '../../redux/actions'

class Registration extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Email: null,
        Username: null,
        Password: null,
      }
    };

    onChangeEmail = (e) => {
      this.setState({ email: e.target.value })
    }

    onChangeUsername = (e) => {
      this.setState({ login: e.target.value })
    }
    onChangePassword = (e) => {
      this.setState({ password: e.target.value })
    }

    registration = async () => {
      const data = this.state;
      const response = await fetch('/api/user/registration/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: data }),
      });
      const user = await response.json();
      this.props.setUser(user);
      this.history.push('/');
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

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: (user) => dispatch(setUserAC(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)