import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import getCurrentUser from "../../services/getCurrentUser.js"

const PodcastTile = ({ podcast }) => {
  const [currentUser, setCurrentUser] = useState({
    id: ''
  })

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch (err) {
      setCurrentUser({
        id: ''
      })
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  let editDeleteButtons = ''
  if (currentUser.id === podcast.userId) {
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
    <div>
      <Link to={`/podcasts/${podcast.id}`}>
        <div className="callout primary">
          <h1>{podcast.name}</h1>
          <p>{podcast.description}</p>
          <div className="margin">
          </div>
        </div>
      </Link>
      {editDeleteButtons}
    </div>
  )
}

export default PodcastTile