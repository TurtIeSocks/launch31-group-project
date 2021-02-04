import React, { useState, useEffect } from "react"
import PodcastTile from "../podcasts/PodcastTile.js"
import { withRouter } from "react-router-dom"

const PodcastGenreShow = (props) => {
  const [podcasts, setPodcasts] = useState([])
  const [genreName, setGenreName] = useState("")

  const genreId = props.match.params.id
  const getPodcasts = async () => {
    try {
      const response = await fetch(`/api/v1/genres/${genreId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setPodcasts(body.genre.podcasts)
      setGenreName(body.genre.name)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getPodcasts()
  }, [])

  const podcastList = podcasts.map((podcast) => {
    return (
      <PodcastTile
        key={podcast.id}
        podcast={podcast}
        user={props.user}
      />)
  })

  return (
    <div className="grid-container">
      <h1>{genreName}</h1>
      <div className="grid-x grid-margin-x small-up-1 medium-up-2 large-up-2">
        {podcastList}
      </div>
    </div>
  )
}

export default withRouter(PodcastGenreShow)
