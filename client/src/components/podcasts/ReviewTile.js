import React from 'react'

const ReviewTile = props => {
  return (
    <li className="callout primary">
      <p>{props.review.rating}</p>
      <p>{props.review.description}</p>
    </li>
  )
}

export default ReviewTile