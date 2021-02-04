import React from "react"
import { Link } from "react-router-dom"
const HomePage = () => {
  return (
    <div>
      <div>
        <h2 className=" callout small welcome-header">PodClassed: Classify Your Listening</h2>
        <div className="grid-x small-1 med-2">
          <div key="add-genre">
            <Link to="/genres" type="button" className="button">
              View Genres
            </Link>
          </div>

          <div key="add-podcast">
            <Link to="/podcasts" type="button" className="button">
              View Podcast
            </Link>
          </div>
        </div>
        <img src="https://images.wsj.net/im-202530?width=1260&size=1.5" />
      </div>
    </div>
  )
}

export default HomePage
