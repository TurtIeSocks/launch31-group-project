import React from "react"
import { Link } from "react-router-dom"

const GenreTile = ({ genre, user }) => {

  let editDeleteButtons = ''

  if (user !== null && user.id === genre.userId) {
    editDeleteButtons = (
      <div>
        <Link to={`/genres/${genre.id}/edit`} className="button">
          Edit
        </Link>
        <Link to={`/genres/${genre.id}/delete`} className="button">
          Delete
        </Link>
      </div>
    )
  }

  return (
    <div className="cell">
      <div className="card text-center" >
        <Link to={`/genres/${genre.id}`}>
          <h2>{genre.name}</h2>
        </Link>
        {editDeleteButtons}
      </div>
    </div>
  )
}

export default GenreTile
