import React from "react"
import { Link } from "react-router-dom"

const PodcastTile = ({ podcast, user }) => {
  let editDeleteButtons = ''

  if (user !== null && user.id === podcast.userId) {
    editDeleteButtons = (
      <div>
        <Link to={`/podcasts/${podcast.id}/edit`} className="button">
          Edit
    </Link>
        <Link to={`/podcasts/${podcast.id}/delete`} className="button">
          Delete
    </Link>
      </div>
    )
  }
  return (
    <div className='callout primary'>
      <Link to={`/podcasts/${podcast.id}`}>
        <h1>{podcast.name}</h1>
        <p>{podcast.description}</p>
      </Link>
      {editDeleteButtons}
    </div>
  )
}

export default PodcastTile