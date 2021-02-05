import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import ErrorList from "../ErrorList.js"
import translateServerErrors from "../../services/translateServerErrors.js"

const PodcastForm = (props) => {
  const [podcastRecord, setPodcastRecord] = useState({
    name: "",
    description: "",
    genreId: "",
    imageUrl: ""
  })
  const [genres, setGenres] = useState([])
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const fetchGenres = async () => {
    try {
      const response = await fetch(`/api/v1/genres`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setGenres([{ name: "", id: "" }, ...body.genres])
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchGenres()
  }, [])

  const availGenres = genres.map(genre => {
    return (
      <option key={genre.id} value={genre.id}>
        {genre.name}
      </option>
    )
  })

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
      genreId: "",
      imageUrl: ""
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    addPodcast(podcastRecord)
    fieldReset()
  }

  const clearForm = (event) => {
    event.preventDefault()
    fieldReset()
  }

  const addPodcast = async (podcastPayload) => {
    try {
      const response = await fetch(`/api/v1/podcasts`, {
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
    <div className="card" id="podcast-review-form">
      <h1>Add a New Podcast</h1>
      <div className="card-divider text-center">

        <ErrorList errors={errors} />
        <form className="callout small" onSubmit={onSubmitHandler}>
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

          <label htmlFor="genreId">
            Genre:
            </label>
          <select
            name="genreId"
            onChange={handleInputChange}
            value={podcastRecord.genreId}>
            {availGenres}
          </select>

          <label htmlFor="imageUrl">
            Image URL:
        </label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            onChange={handleInputChange}
            value={podcastRecord.imageUrl}
          />

          <div className="button-group">
            <button className="button" onClick={clearForm}>
              Clear
          </button>
            <input className="button" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default PodcastForm
