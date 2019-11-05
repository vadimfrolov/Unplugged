import React, { Component } from 'react';
import { Link } from "react-router-dom";



export default class ShowAll extends Component {
    render() {
        return (
            <Link to={`/concerts/${this.props.id}`}>
                <button>Show All</button>
            </Link>

        )
    }
}