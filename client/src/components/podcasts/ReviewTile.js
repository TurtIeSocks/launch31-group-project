import React from 'react'

const ReviewTile = props => {
  const { user, rating, description } = props.review
  return (
    <div className="callout primary">
      <p>{user.username}</p>
      <p>{rating}</p>
      <p>{description}</p>
    </div>
  )
}

export default ReviewTile