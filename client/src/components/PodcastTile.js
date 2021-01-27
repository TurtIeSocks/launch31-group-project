import React from "react"

const PodcastTile = ({ podcast }) => {
  return (
    <div className="callout primary">
      <h1>{podcast.name}</h1>
      <p>{podcast.description}</p>
    </div>
  )
}

export default PodcastTile
