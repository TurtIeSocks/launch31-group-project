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

  const handleSubmit = event => {
    event.preventDefault()
    postReview(podcastReviewRecord)
    clearForm()
  }

  const clearForm = event => {
    setPodcastReviewRecord({
      description: "",
      rating: ""
    })
  }
 
  return (
    <div className="callout">
      <h1>Write a review</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
          name="description"
          onChange={handleInputChange}
          value={podcastReviewRecord.description}
          />
        </label>

        <label>
          <select
            name="rating"
            onChange={handleInputChange}
            value={podcastReviewRecord.rating}>
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