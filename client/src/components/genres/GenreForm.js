import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import ErrorList from "../ErrorList.js"
import translateServerErrors from "../../services/translateServerErrors.js"

const NewGenreForm = (props) => {
  const [newGenre, setNewGenre] = useState({
    name: "",
  })
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const postGenre = async (newGenreData) => {
    try {
      const response = await fetch(`/api/v1/genres`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newGenreData),
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
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

  if (shouldRedirect) {
    return <Redirect to="/genres" />
  }

  const handleInputChange = (event) => {
    setNewGenre({
      ...newGenre,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postGenre(newGenre)
    clearForm()
  }

  const clearForm = (event) => {
    event.preventDefault()
    setNewGenre({
      name: "",
    })
  }

  return (
    <div>
      <h1>Add a New Genre</h1>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit} className="callout">
        <label>
          Name:
          <input type="text" name="name" onChange={handleInputChange} value={newGenre.name} />
        </label>
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

export default NewGenreForm
