import React from 'react'
import { Chip } from "react-materialize";

const TourSnippet = ({ title, city }) => {
  return (
    <div >
    <Chip style={{fontSize: "16px"}}>{title}, {city}</Chip>
    </div>
  )
}

export default TourSnippet
