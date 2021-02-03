import React from "react"
import { Link } from "react-router-dom"

const PodcastTile = ({ podcast }) => {
  return (
    <div className="grid-x grid-margin-x small-up-2 medium-up-3">
      <div className="cell small-6">
        <div className="card">
          <Link to={`/podcasts/${podcast.id}`}>
            <div className="card-section">
              <h1>{podcast.name}</h1>
              <p>{podcast.description}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PodcastTile
