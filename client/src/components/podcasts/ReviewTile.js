import React from 'react'

const ReviewTile = props => {  
  // debugger
  return (
      <li className="callout primary">
        <p>{props.review.rating}</p>
        <p>{props.review.description}</p>
      </li>
  )
}

export default ReviewTile