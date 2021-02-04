import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import ErrorList from "../ErrorList.js"
import translateServerErrors from "../../services/translateServerErrors.js"

const PodcastEdit = (props) => {
  const [podcastRecord, setPodcastRecord] = useState({
    name: "",
    description: "",
    genreId: ""
  })
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { id: podcastId } = props.match.params

  const fetchPodcast = async () => {
    try {
      const response = await fetch(`/api/v1/podcasts/${podcastId}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      const podcast = body.podcast
      if (!podcast.description) {
        setPodcastRecord({ ...podcast, description: "" })
      } else {
        setPodcastRecord(body.podcast)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const editPodcast = async (podcastPayload) => {
    try {
      const response = await fetch(`/api/v1/podcasts/${podcastId}`, {
        method: "PATCH",
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

  useEffect(() => {
    fetchPodcast()
  }, [])

  const handleInputChange = (event) => {
    setPodcastRecord({
      ...podcastRecord,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const fieldReset = () => {
    setPodcastRecord({
      name: "",
      description: "",
      genreId: ""
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    editPodcast(podcastRecord)
    fieldReset()
  }

  const clearForm = (event) => {
    event.preventDefault()
    fieldReset()
  }

  if (shouldRedirect) {
    return <Redirect to="/podcasts" />
  }

  return (
    <div>
      <h1>Edit Podcast</h1>
      <ErrorList errors={errors} />
      <form className="callout" onSubmit={onSubmitHandler}>
        <label htmlFor="name">
          Podcast Name:
        </label>
        <input type="text"
          id="name"
          name="name"
          onChange={handleInputChange}
          value={podcastRecord.name}
        />
        <label htmlFor="description">
          Podcast Description:
        </label>
        <input
          type="text"
          name="description"
          id="description"
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

export default PodcastEdit
