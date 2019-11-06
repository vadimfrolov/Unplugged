import React from 'react'
import { Chip } from "react-materialize";

const TourSnippet = ({ title, city }) => {
  return (
    <div >
    <Chip>{title}, {city}</Chip>
    {/* <Chip classname="truncate">{title}</Chip> */}
    </div>
  )
}

export default TourSnippet
