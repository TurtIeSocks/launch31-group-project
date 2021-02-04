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

  const resetFields = ()=> {
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
    <div className="card">
      <div className="card-divider">
        <h1>Write a review</h1>
      </div>
      <form onSubmit={handleSubmit} >
        <label htmlFor='description'>Review Body:
          <input
            type='text'
            name="description"
            onChange={handleInputChange}
            value={podcastReviewRecord.description}
          />
        </label>

        <label htmlFor='rating'>Star Rating: 
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