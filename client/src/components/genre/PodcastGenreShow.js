import React, { useState, useEffect } from 'react'
import PodcastTile from '../PodcastTile.js' 

const PodcastGenreShow = props => {
  const [podcasts, setPodcasts] = useState([])
  const [genreName, setGenreName] = useState('')

  const getPodcasts = async () => {
    const genreId = props.match.params.id
    console.log(genreId)
    
    try {
      const response = await fetch(`/api/v1/genres/${genreId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
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

  const podcastList = podcasts.map(podcast => {
    return(
      <PodcastTile
        key={podcast.id}
        podcast={podcast}
      />
    )
  })

  return(
    <div>
      <h1>{genreName}</h1>
      {podcastList}
    </div>
  )
}

export default PodcastGenreShow