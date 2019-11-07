import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {

  Button
} from "react-materialize";


export default class ShowAll extends Component {
    render() {
        return (
            <Link to={`/concerts/${this.props.id}`}>
                <Button className="red darken-4">Show All Concerts</Button>
            </Link>

        )
    }
}
