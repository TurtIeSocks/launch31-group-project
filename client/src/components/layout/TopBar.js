import React from "react"
import { Link } from "react-router-dom"
import SignOutButton from "../authentication/SignOutButton"

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className="button">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>
  ]

  const authenticatedListItems = [
    <li key="add-genre">
      <Link to="/genres/new" type="button" className="button">
        Add Genre
      </Link>
    </li>,
    <li key="add-podcast">
      <Link to="/podcasts/new" type="button" className="button">
        Add Podcast
      </Link>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>
  ]

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">Pod Classed</li>
          <li>
            <Link to="/" className="button-text">
              Home
            </Link>
          </li>
          <li>
            <Link to="/genres" className="button-text">
              Genres
            </Link>
          </li>
          <li>
            <Link to="/podcasts" className="button-text">
              Podcasts
            </Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  )
}

export default TopBar
