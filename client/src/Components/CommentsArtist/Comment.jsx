import React, { Component } from "react";


let moment = require("moment");

 export default class Comment extends Component {
  render() {
    const { text, nameUser, date } = this.props;
    return (
      <div>
        {text}
        <div>{nameUser}</div>
        <div>{moment(date).format("LLL")}</div>
        <div>_____________________</div>
      </div>
    );
  }
}

