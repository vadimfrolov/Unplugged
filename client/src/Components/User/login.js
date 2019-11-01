import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserAC } from '../../redux/actions'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: null,
      Password: null,
    };
  };

  onChangeUsername = (e) => {
    this.setState({ login: e.target.value })
  }
  onChangePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  login = async () => {
    const data = this.state;
    const response = await fetch('/api/user/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data }),
    });
    const user = await response.json();
    this.props.setUser(user);
    this.props.history.push('/')
  }

  logout = async () => {
    await fetch('/api/user/logout/');
    const user = null;
    this.props.setUser(user)
  }
  render() {
    return (
      <div>
        <input placeholder='login' onChange={this.onChangeUsername}></input>
        <input placeholder='password' type='password' onChange={this.onChangePassword}></input>
        <button onClick={this.login}>login</button>
        <button onClick={this.logout}>logout</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)