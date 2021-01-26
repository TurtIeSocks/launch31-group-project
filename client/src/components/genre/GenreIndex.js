import React, { useState, useEffect } from 'react'
import GenreTile from './GenreTile.js'

const GenreIndex = props => {
  const [genres, setGenres] = useState([])

  const getGenres = async () => {
    try {
      const response = await fetch(`/api/v1/genres`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
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

  const genreItems = genres.map(genre => {
    return (
      <GenreTile
        key={genre.id}
        id={genre.id}
        name={genre.name}
      />
    )
  })
  return(
    <div >
      {genreItems}
    </div>
  )
}

export default GenreIndex