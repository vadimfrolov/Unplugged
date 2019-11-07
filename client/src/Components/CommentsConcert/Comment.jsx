import React, { Component } from "react";

import M from "materialize-css";
import {
  Row,
  Col,
  Collection,
  CollectionItem,
} from "react-materialize";

let moment = require("moment");


export default class Comment extends Component {
  render() {
    const { text, nameUser, date } = this.props;
    return (
      <Row>
        <Col m={8} s={12}>
          <Collection style={{ margin: "-4px" }}>
            <CollectionItem className="avatar">
              <img src="https://materializecss.com/images/yuna.jpg" alt="" className="circle" />
              <p style={{ color: "black" }}>
                {text}
              </p>
              <p style={{ color: "#b71c1c" }}>
                {moment(date).format("LLL")}
              </p>
            </CollectionItem>
          </Collection>
        </Col>
      </Row>
    );
  }
}
