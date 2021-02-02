import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

const PodcastDel = (props) => {
  const [podcastRecord, setPodcastRecord] = useState({
    name: "",
    description: "",
  })
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { id: podcastId } = props.match.params

  const fetchPodcast = async () => {
    try {
      const response = await fetch(`/api/v1/podcasts/${podcastId}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setPodcastRecord(body.podcast)
    } catch (error) {
      console.error(error.message)
    }
  }

  const deletePodcast = async (podcastPayload) => {
    try {
      const response = await fetch(`/api/v1/podcasts/${podcastId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(podcastPayload),
      })
      setShouldRedirect(true)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchPodcast()
  }, [])

  const onSubmitHandler = (event) => {
    event.preventDefault()
    deletePodcast(podcastRecord)
  }

  const clearForm = (event) => {
    event.preventDefault()
    setShouldRedirect(true)
  }


  if (shouldRedirect) {
    return <Redirect to="/podcasts" />
  }

  return (
    <div>
      <h1>Delete Podcast {podcastRecord.name}</h1>
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

export default PodcastDel
