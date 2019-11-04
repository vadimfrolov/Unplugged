import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserAC } from '../../Redux/UserAuth/actions/userAuth'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  };

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value })
  }
  onChangePassword = (e) => {
    this.setState({ password: e.target.value })
  }

  login = async () => {
    const data = this.state;
    const response = await fetch('/users/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data }),
    });
    const user = await response.json();
    this.props.setUserAC({user: user});
  }

  logout = async () => {
    await fetch('/users/logout/');
    const user = null;
    this.props.setUserAC({user: user});
  }
  render() {
    return (
      <div>
        <input placeholder='login' onChange={this.onChangeUsername}></input>
        <input placeholder='password' type='password' onChange={this.onChangePassword}></input>
        <button onClick={this.login}>login</button>
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
  setUserAC
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)