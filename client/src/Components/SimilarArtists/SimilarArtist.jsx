import React from 'react'
import { Chip } from "react-materialize";


const SimilarArtist = ({ title }) => {
  return (
    <span className="simAr">
    <Chip style={{fontSize: "16px"}}>{title}</Chip>
    </span>
  )
}

export default SimilarArtist;
