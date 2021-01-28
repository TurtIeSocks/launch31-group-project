import React, { useState, useEffect } from "react"
import PodcastTile from "../podcasts/PodcastTile.js"
import PodcastForm from "../podcasts/PodcastForm.js"
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
    return <PodcastTile key={podcast.id} podcast={podcast} />
  })

  return (
    <div>
      <h1>{genreName}</h1>
      <PodcastForm genreId={genreId} />
      {podcastList}
    </div>
  )
}

export default PodcastGenreShow
