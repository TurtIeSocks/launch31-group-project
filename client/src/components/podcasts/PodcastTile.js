import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const PodcastTile = ({ podcast, user }) => {
  const [userVotes, setUserVote] = useState({
    hasUpVoted: false,
    hasDownVoted: false
  })
  const [totalVotes, setTotalVotes] = useState(0)

  let upVoteButtonClass = 'button'
  if (userVotes.hasUpVoted) {
    upVoteButtonClass = 'success button'
  }
  let downVoteButtonClass = 'button'
  if (userVotes.hasDownVoted) {
    downVoteButtonClass = 'alert button'
  }

  const fetchVotes = async () => {
    try {
      const response = await fetch(`/api/v1/podcasts/${podcast.id}/votes`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      const votes = body.votes
      setTotalVotes(votes.totalVotes.value)
      if (votes.userVotes) {
        if (votes.userVotes.value === 1) {
          setUserVote({ hasUpVoted: true, hasDownVoted: false })
        } else {
          setUserVote({ hasUpVoted: false, hasDownVoted: true })
        }
      } else {
        setUserVote({ hasUpVoted: false, hasDownVoted: false })
      }
    } catch (error) {
      console.error(error.message)
    }
  }

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
      const votes = body.votes
      const voteType = votes.userVotes.value === 1 ? 'up' : 'down'
      if (voteType === 'up') {
        setUserVote({ hasUpVoted: true, hasDownVoted: false })
      } else {
        setUserVote({ hasUpVoted: false, hasDownVoted: true })
      }
      setTotalVotes(votes.totalVotes.value)
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
      const votes = body.votes
      if (votes.userVotes.value === 1) {
        setUserVote({ hasUpVoted: true, hasDownVoted: false })
      } else {
        setUserVote({ hasUpVoted: false, hasDownVoted: true })
      }
      setTotalVotes(votes.totalVotes.value)
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
      const votes = body.votes
      setTotalVotes(votes.totalVotes.value)
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
    <div className='card text-center'>
      <Link to={`/podcasts/${podcast.id}`}>
        <h1>{podcast.name}</h1>
        <p>{podcast.description}</p>
      </Link>
      {voteButtons}
      {editDeleteButtons}
    </div>
  )
}

export default PodcastTile