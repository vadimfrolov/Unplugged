import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserAC } from '../../Redux/UserAuth/actions/userAuth'

class UserUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.user;
  };


  onChangeUsername = (e) => {
    this.setState({ Username: e.target.value })
  };

  onChangeCity = (e) => {
    this.setState({ City: e.target.value })
  };

  onChangeUserpik = (e) => {
    this.setState({ Userpik: e.target.value })
  };

  update = async () => {
    const data = this.state

    const response = await fetch('/api/users/update/', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data.user }),
    });
    const user = await response.json();
    this.props.setUser(user);
  }


  render() {
    return (
      <div>
        {!this.props.user ?
          <></> :
          <div>
            {JSON.stringify(this.state)}
            <input type="text" value={this.props.user.Username} onChange={this.onChangeUsername} />
            <input type="text" value={this.props.user.City} onChange={this.onChangeCity} />
            <input type="text" value={this.props.user.Userpic} onChange={this.onChangeUserpik} />
            <button onClick={this.update}>update</button>
          </div>
        }
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


export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate)
