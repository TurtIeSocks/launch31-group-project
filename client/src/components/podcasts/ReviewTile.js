import React from 'react'

const ReviewTile = props => {
  const { user, rating, description } = props.review
  return (
    <div className="card text-center">
      <p>{user.username}</p>
      <p>{rating}</p>
      <p>{description}</p>
    </div>
  )
}

export default ReviewTile