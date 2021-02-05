import React, { useState, useEffect } from "react"
import ErrorList from "../ErrorList"
import translateServerErrors from "../../services/translateServerErrors"
import PodcastReviewForm from './PodcastReviewForm'
import ReviewTile from '../reviews/ReviewTile.js'
import { withRouter } from "react-router-dom"

const PodcastShowPage = (props) => {
  const [podcast, setPodcast] = useState({
    name: "",
    description: "",
    reviews: []
  })
  const [errors, setErrors] = useState([])

  const { id: podcastId } = props.match.params

  const fetchPodcast = async () => {
    try {
      const response = await fetch(`/api/v1/podcasts/${podcastId}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setPodcast(body.podcast)
    } catch (error) {
      console.error(error.message)
    }
  }

  const postPodcastReview = async (reviewPayload) => {
    try {
      const response = await fetch(`/api/v1/podcasts/${podcastId}/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(reviewPayload)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw (error)
        }
      } else {
        const body = await response.json()
        setPodcast({
          ...podcast,
          reviews: [...podcast.reviews, body.review]
        })
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchPodcast()
  }, [])

  let submitNewReviewForm = ''
  if (props.user) {
    submitNewReviewForm = (
      <div>
        <ErrorList errors={errors} />
        <PodcastReviewForm postReview={postPodcastReview} />
      </div>
    )
  }

  const reviews = podcast.reviews.map(review => {
    return (
      <ReviewTile
        key={review.id}
        review={review}
        user={props.user}
      />
    )
  })

  const divStyle = {
    backgroundImage: `url(${podcast.imageUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover"
  }
  return (
    <div style={divStyle}>
      <div className="callout">
        <h1>{podcast.name}</h1>
        <p>{podcast.description}</p>
      </div>
      {submitNewReviewForm}
      <div className="grid-container">
        <div className="grid-x grid-margin-x small-up-1 medium-up-2 large-up-3">
          {reviews}
        </div>
      </div>
    </div>
  )
}

export default withRouter(PodcastShowPage)
