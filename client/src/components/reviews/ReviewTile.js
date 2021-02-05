import React from 'react'
import { Link } from 'react-router-dom'

const ReviewTile = props => {
  const { user, rating, description, id } = props.review
  
  let editDeleteButtons = ''
  if (user !== null) {
    if (user.id === props.user.id) {
      editDeleteButtons =
        <div>
          <Link to={`/review/${id}/edit`} className="button">
            Edit
          </Link>
          <Link to={`/review/${id}/delete`} className="button">
            Delete
          </Link>
        </div>
    }
  }

  return (
    <div className="cell">
      <div className="card text-center">
        <p>{user.username}</p>
        <p>{rating}</p>
        <p>{description}</p>
        {editDeleteButtons}
      </div>
    </div>
  )
}

export default ReviewTile