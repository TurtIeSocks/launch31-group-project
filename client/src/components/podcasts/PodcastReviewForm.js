import React, { useState } from 'react'

const ratings = ['', '★', '★ ★', '★ ★ ★', '★ ★ ★ ★', '★ ★ ★ ★ ★']

const PodcastReview = ({ postReview }) => {
  const [podcastReviewRecord, setPodcastReviewRecord] = useState({
    description: "",
    rating: ""
  })

  const ratingOptions = ratings.map(rating => {
    return (
      <option key={rating} value={rating}>
        {rating}
      </option>
    )
  })

  const handleInputChange = event => {
    setPodcastReviewRecord({
      ...podcastReviewRecord,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const resetFields = () => {
    setPodcastReviewRecord({
      description: "",
      rating: ""
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    postReview(podcastReviewRecord)
    resetFields()
  }

  const clearForm = event => {
    event.preventDefault()
    resetFields()
  }

  return (
    <div className="card" id="podcast-review-form">
      <div className="card-divider text-center">
        <h1>Write Your Review Here</h1>
      </div>
      <form onSubmit={handleSubmit} >
        <label htmlFor='description' className="text-left">Review Body
          <textarea
            name="description"
            onChange={handleInputChange}
            value={podcastReviewRecord.description}
            className="input-field"
          />
        </label>

        <label htmlFor='rating' className="text-left">Star Rating
          <select
            name="rating"
            onChange={handleInputChange}
            value={podcastReviewRecord.rating}
            className="input-field"
            id="star-rating">
            {ratingOptions}
          </select>
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
          <button className="button" onClick={clearForm}>Clear</button>
        </div>
      </form>
    </div>
  )
}

export default PodcastReview