import React from 'react'

const TourSnippet = ({ title, city, start }) => {
  return (
    <div>
      <h2>{title}, {city}, {start}</h2>
    </div>
  )
}

export default TourSnippet
