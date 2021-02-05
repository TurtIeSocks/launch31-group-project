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

  const divStyle = {
    backgroundImage: `url(${genre.imageUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover"
  }

  return (
    <div className="cell">
      <div className="card text-center genre-tile" style={divStyle} >
        <Link to={`/genres/${genre.id}`}>
          <div className="genre-name">{genre.name}</div>
        </Link>
        {editDeleteButtons}
      </div>
    </div>
  )
}

export default GenreTile
