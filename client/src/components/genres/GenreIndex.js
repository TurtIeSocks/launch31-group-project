import React, { useState, useEffect } from "react"
import GenreTile from "./GenreTile.js"

const GenreIndex = (props) => {
  const [genres, setGenres] = useState([])

  const getGenres = async () => {
    try {
      const response = await fetch(`/api/v1/genres`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setGenres(body.genres)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getGenres()
  }, [])

  const genreItems = genres.map((genre) => {
    return (
      <GenreTile
        key={genre.id}
        genre={genre}
        user={props.user}
      />)
  })

  return (
    <div className="grid-container">
      <h1 className="header">Podcast Genres</h1>
      <div className="grid-x grid-margin-x small-up-1 medium-up-2 large-up-3">
        {genreItems}
      </div>
    </div>
  )
}

export default GenreIndex
