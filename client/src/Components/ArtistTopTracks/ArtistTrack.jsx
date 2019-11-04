import React from 'react'
// import YoutubeControls from "../Youtube/YoutubeControls"

const ArtistTrack = ({ trackName, trackNum }) => {
  return (
    <div>
      <div>{`${trackNum} - ${trackName}`}</div>
      {/* <YoutubeControls /> */}
    </div>
  )
}

export default ArtistTrack
