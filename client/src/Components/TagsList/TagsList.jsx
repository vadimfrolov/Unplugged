import React from 'react'
import { connect } from 'react-redux';


import TagsItem from './TagsItem';

const TagsList = ({ tags }) => {
  return tags.map(({ name }, i) => (
  <TagsItem title={name} key={`${name}_${i}`} />
  ));
}

const mapStateToProps = (state) => ({
  tags: state.artist.tags
});

export default connect(
  mapStateToProps
)(TagsList);
