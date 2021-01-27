import React, { useState, useEffect } from "react"

const PodcastShowPage = (props) => {
  const [podcast, setPodcast] = useState({ name: "", description: "" })

  const { id } = props.match.params
  const fetchPodcast = async () => {
    try {
      const response = await fetch(`/api/v1/podcasts/${id}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setPodcast(body.podcast)
    } catch (error) {
      console.error(error.message)
    }
  }
  
  useEffect(() => {
    fetchPodcast()
  }, [])

  return (
    <div>
      <h1>{podcast.name}</h1>
      <p>{podcast.description}</p>
    </div>
  )
}

export default PodcastShowPage
