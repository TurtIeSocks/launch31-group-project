import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const PodcastTile = ({ podcast, user }) => {
  const [userVotes, setUserVote] = useState({
    hasUpVoted: false,
    hasDownVoted: false
  })
  const [totalVotes, setTotalVotes] = useState(podcast.totalVotes.value)

  let upVoteButtonClass = 'button'

  if (userVotes.hasUpVoted) {
    upVoteButtonClass = 'success button'
  }

  let downVoteButtonClass = 'button'

  if (userVotes.hasDownVoted) {
    downVoteButtonClass = 'alert button'
  }

  const getUserVoteState = value => {
    let state = { hasUpVoted: false, hasDownVoted: true }
    if (value && value === 1) {
      state = { hasUpVoted: true, hasDownVoted: false }
    }
    return setUserVote(state)
  }

  useEffect(() => {
    podcast.userVotes.forEach(vote => {
      if (vote.userId === user.id) {
        getUserVoteState(vote.value)
      }
    })
  }, [])

  const newVote = async (votePayload) => {
    try {
      const response = await fetch(`/api/v1/podcasts/${podcast.id}/votes`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(votePayload)
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      getUserVoteState(body.vote.value)
      setTotalVotes(body.total.value)
    } catch (error) {
      console.error(error.message)
    }
  }

  const editVote = async (votePayload) => {
    try {
      const response = await fetch(`/api/v1/podcasts/${podcast.id}/votes`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(votePayload)
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      getUserVoteState(body.vote.value)
      setTotalVotes(body.total.value)
    } catch (error) {
      console.error(error.message)
    }
  }

  const removeVote = async (votePayload) => {
    try {
      const response = await fetch(`/api/v1/podcasts/${podcast.id}/votes`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(votePayload)
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setTotalVotes(body.total.value)
      setUserVote({ hasUpVoted: false, hasDownVoted: false })
    } catch (error) {
      console.error(error.message)
    }
  }

  const upVoteClickHandler = (event) => {
    event.preventDefault()
    if (userVotes.hasDownVoted && !userVotes.hasUpVoted) {
      editVote({ value: 1 })
    } else if (userVotes.hasUpVoted) {
      removeVote({ value: 0 })
    } else {
      newVote({ value: 1 })
    }
  }

  const downVoteClickHandler = (event) => {
    event.preventDefault()
    if (!userVotes.hasDownVoted && userVotes.hasUpVoted) {
      editVote({ value: -1 })
    } else if (userVotes.hasDownVoted) {
      removeVote({ value: 0 })
    } else {
      newVote({ value: -1 })
    }
  }

  let voteButtons = ''
  let editDeleteButtons = ''
  if (user !== null) {
    useEffect(() => {
      fetchVotes()
    }, [])

    voteButtons =
      <div>
        <button className={upVoteButtonClass} onClick={upVoteClickHandler}>
          Upvote
        </button>
        <button className={downVoteButtonClass} onClick={downVoteClickHandler}>
          Downvote
        </button>
        {totalVotes}
      </div>
    if (user.id === podcast.userId) {
      editDeleteButtons =
        <div>
          <Link to={`/podcasts/${podcast.id}/edit`} className="button">
            Edit
          </Link>
          <Link to={`/podcasts/${podcast.id}/delete`} className="button">
            Delete
          </Link>
        </div>
    }
  }

  return (
    <div className="cell">
      <div className='card text-center'>
        <Link to={`/podcasts/${podcast.id}`}>
          <div className="card-divider">
            <h1>{podcast.name}</h1>
          </div>
          <div className="card-section">
            <p>{podcast.description}</p>
          </div>
        </Link>
        {voteButtons}
        {editDeleteButtons}
      </div>
    </div>
  )
}

export default PodcastTile