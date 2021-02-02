import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import getCurrentUser from "../../services/getCurrentUser.js"

const GenreTile = ({ genre }) => {
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

  if (currentUser.id === genre.userId) {
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
    <div className="callout primary">
      <h2>
        <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
      </h2>
      {editDeleteButtons}
    </div>
  )
}

export default GenreTile
