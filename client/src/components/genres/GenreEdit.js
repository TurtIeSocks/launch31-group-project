import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import ErrorList from "../ErrorList.js"
import translateServerErrors from "../../services/translateServerErrors.js"

const GenreEdit = (props) => {
  const [genreRecord, setGenreRecord] = useState({
    name: ""
  })
  const [errors, setErrors] = useState([])
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

  const editGenre = async (genrePayload) => {
    try {
      const response = await fetch(`/api/v1/genres/${genreId}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(genrePayload),
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        setErrors([])
        setShouldRedirect(true)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchGenre()
  }, [])

  const handleInputChange = (event) => {
    setGenreRecord({
      ...genreRecord,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const fieldReset = () => {
    setGenreRecord({
      name: ""
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    editGenre(genreRecord)
    fieldReset()
  }

  const clearForm = (event) => {
    event.preventDefault()
      fieldReset()
  }

  if (shouldRedirect) {
    return <Redirect to="/genres" />
  }

  return (
    <div>
      <h1>Edit Genres</h1>
      <ErrorList errors={errors} />
      <form className="callout" onSubmit={onSubmitHandler}>
        <label htmlFor="name">
        Podcast Name:
        </label>
          <input type="text" 
          id="name" 
          name="name" 
          onChange={handleInputChange} 
          value={genreRecord.name} 
          />
        <div className="button-group">
          <button className="button" onClick={clearForm}>
            Clear
          </button>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default GenreEdit
