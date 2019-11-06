import React from 'react'
import { Chip } from "react-materialize";

const TagsItem = ({ title }) => {
  return (
    <span className="simAr">
    <Chip>{title}</Chip>
    </span>
  )
}

export default TagsItem;
