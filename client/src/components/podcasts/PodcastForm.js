import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import ErrorList from "../ErrorList.js"
import translateServerErrors from "../../services/translateServerErrors.js"

const PodcastForm = (props) => {
  const [podcastRecord, setPodcastRecord] = useState({
    name: "",
    description: "",
  })
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const handleInputChange = (event) => {
    setPodcastRecord({
      ...podcastRecord,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    addPodcast(podcastRecord)
    clearForm()
  }

  const clearForm = (event) => {
    // event.preventDefault()
    setPodcastRecord({
      name: "",
      description: "",
    })
  }
  const genreId = props.genreId
  const addPodcast = async (podcastPayload) => {
    try {
      const response = await fetch(`/api/v1/genres/${genreId}/podcasts`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(podcastPayload),
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

  if (shouldRedirect) {
    return <Redirect to="/podcasts" />
  }

  return (
    <div>
      <h1>Add a New Podcast</h1>
      <ErrorList errors={errors} />
      <form className="callout" onSubmit={onSubmitHandler}>
        <label htmlFor="name" />
        Podcast Name:
        <input type="text" name="name" onChange={handleInputChange} value={podcastRecord.name} />
        <label htmlFor="description" />
        Podcast Description:
        <input
          type="text"
          name="description"
          onChange={handleInputChange}
          value={podcastRecord.description}
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
export default PodcastForm
