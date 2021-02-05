import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"

const ReviewDeleteButton = (props) => {
  const [reviewRecord, setReviewRecord] = useState({
    description: "",
    rating: "",
    podcastId: ""
  })
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { id: reviewId } = props.match.params

  const fetchReview = async () => {
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setReviewRecord(body.review)
    } catch (error) {
      console.error(error.message)
    }
  }

  const deleteReview = async (reviewPayload) => {
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(reviewPayload),
      })
      setShouldRedirect(true)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchReview()
  }, [])

  const onSubmitHandler = (event) => {
    event.preventDefault()
    deleteReview(reviewRecord)
  }

  const clearForm = (event) => {
    event.preventDefault()
    setShouldRedirect(true)
  }

  if (shouldRedirect) {
    return <Redirect to={`/podcasts/${reviewRecord.podcastId}`} />
  }

  return (
    <div>
      <h1>Delete Review?</h1>
      <div className="button-group">
        <button className="alert button" onClick={onSubmitHandler}>
          Yes
        </button>
        <button className="button" onClick={clearForm}>
          No
        </button>
      </div>
    </div>
  )
}

export default ReviewDeleteButton
