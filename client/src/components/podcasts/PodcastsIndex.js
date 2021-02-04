import React, { useState, useEffect } from "react"
import PodcastTile from "./PodcastTile"

const PodcastsIndex = (props) => {
  const [podcasts, setPodcasts] = useState([])

  const getPodcasts = async () => {
    try {
      const response = await fetch("api/v1/podcasts")
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setPodcasts(body.podcasts)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getPodcasts()
  }, [])

  const podcastTiles = podcasts.map((podcast) => {
    return (
      <PodcastTile
        key={podcast.id}
        podcast={podcast}
        user={props.user}
      />
    )
  })

  return (
    <div className="grid-container">
      <h1 className="header">Podcasts</h1>
      <div className="grid-x grid-margin-x small-up-1 medium-up-2 large-up-3">
        {podcastTiles}
      </div>
    </div>
  )
}

export default PodcastsIndex
