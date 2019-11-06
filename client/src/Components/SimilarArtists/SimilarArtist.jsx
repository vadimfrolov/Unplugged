import React from 'react'
import { Chip } from "react-materialize";


const SimilarArtist = ({ title }) => {
  return (
    <span className="simAr">
      
    <Chip> {title} </Chip>
    </span>
  )
}

export default SimilarArtist;
