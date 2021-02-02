import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

const GenreDel = (props) => {
  const [genreRecord, setGenreRecord] = useState({
    name: ""
  })
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { id: genreId } = props.match.params

  const fetchGenre = async () => {
    try {
      const response = await fetch(`/api/v1/genres/${genreId}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setGenreRecord(body.genre)
    } catch (error) {
      console.error(error.message)
    }
  }

  const deleteGenre = async (genrePayload) => {
    try {
      const response = await fetch(`/api/v1/genres/${genreId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(genrePayload),
      })
      setShouldRedirect(true)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchGenre()
  }, [])

  const onSubmitHandler = (event) => {
    event.preventDefault()
    deleteGenre(genreRecord)
  }

  const clearForm = (event) => {
    event.preventDefault()
    setShouldRedirect(true)
  }

  if (shouldRedirect) {
    return <Redirect to="/genres" />
  }

  return (
    <div>
      <h1>Delete Genre {genreRecord.name}</h1>
      <div className="button-group">
      <button className="button" onClick={onSubmitHandler}>
          Yes
          </button>
        <button className="button" onClick={clearForm}>
          No
          </button>
      </div>
    </div>
  )
}

export default GenreDel
