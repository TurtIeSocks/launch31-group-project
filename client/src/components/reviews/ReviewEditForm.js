import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import ErrorList from "../ErrorList.js"
import translateServerErrors from "../../services/translateServerErrors.js"

const ReviewEditForm = (props) => {
  const [reviewRecord, setReviewRecord] = useState({
    description: "",
    rating: "",
    podcastId: ""
  })

  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { id: reviewId } = props.match.params

  const ratings = ['', '★', '★ ★', '★ ★ ★', '★ ★ ★ ★', '★ ★ ★ ★ ★']

  const ratingOptions = ratings.map(rating => {
      return (
        <option key={rating} value={rating}>
          {rating}
        </option>
      )
    })

  const fetchReview = async () => {
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      const review = body.review
      setReviewRecord(body.review)
    } catch (error) {
      console.error(error.message)
    }
  }

  const editReview = async (reviewPayload) => {
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(reviewPayload),
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
    fetchReview()
  }, [])

  const handleInputChange = (event) => {
    setReviewRecord({
      ...reviewRecord,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const fieldReset = () => {
    setReviewRecord({
      description: "",
      rating: "",
      podcastId: ""
    })
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    editReview(reviewRecord)
  }

  const clearForm = (event) => {
    event.preventDefault()
    fieldReset()
  }

  if (shouldRedirect) {
    return <Redirect to={`/podcasts/${reviewRecord.podcastId}`}/>
  }

  return (
    <div>
      <h1>Edit Review</h1>
      <ErrorList errors={errors} />
      <form className="callout" onSubmit={onSubmitHandler}>
          <label htmlFor='description' className="text-left">Review Body
          <textarea
            name="description"
            onChange={handleInputChange}
            value={reviewRecord.description}
            className="input-field"
          />
        </label>

        <label htmlFor='rating' className="text-left">Star Rating
          <select
            name="rating"
            onChange={handleInputChange}
            value={reviewRecord.rating}
            className="input-field"
            id="star-rating">
            {ratingOptions}
          </select>
        </label>

        <div className="button-group">
          <button className="button" onClick={clearForm}>
            Clear
          </button>
          <input className="success button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}



export default ReviewEditForm
