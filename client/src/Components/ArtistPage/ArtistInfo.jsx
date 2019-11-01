import React, { Component } from "react";
import { connect } from 'react-redux';
import get from 'lodash.get';
import { withRouter } from 'react-router-dom';
import Upcoming from "./Upcoming";
import TagsList from '../TagsList'

class ArtistInfo extends Component {
  state = {
    id: '',
    name: ''
  }

  render() {
    const { artist } = this.props;

    const name = get(artist, 'name');
    const content = get(artist, 'bio.content');

    return (
      <div>
        <p>{name}</p>
        <p>{content}</p>
        <TagsList />
        <Upcoming />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  artist: store.artist
});

export default connect(
  mapStateToProps
)(withRouter(ArtistInfo));