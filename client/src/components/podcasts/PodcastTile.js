import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const PodcastTile = (props) => {
  const [userVote, setUserVote] = useState({
    hasVoted: false,
    value: 0
  })
  const [totalVotes, setTotalVotes] = useState({
    value: 0
  })

  // const [userId, setUserId] = useState(user.id)

  const fetchVotes = async () => {
    try {
      const response = await fetch(`/api/v1/podcasts/${props.podcast.id}/votes`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      const votes = body.votes
      setTotalVotes(votes.totalVotes)
      if (votes.user) {
        setUserVote({hasVoted: true, value: votes.user.value})
      }    
    } catch (error) {
      console.error(error.message)
    }
  }

  const newVote = async (votePayload) => {
    try {
      const response = await fetch(`/api/v1/podcasts/${props.podcast.id}/votes`, {
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
      setUserVote({...votes, value: votes.userVotes.value})
      setTotalVotes(votes.totalVotes)
    } catch (error) {
      console.error(error.message)
    }
  }

  const editVote = async (votePayload) => {
    try {
      const response = await fetch(`/api/v1/podcasts/${props.podcast.id}/votes`, {
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
      const vote = body.vote
      setTotalVotes(vote)
      setUserVote(vote.user)
    } catch (error) {
      console.error(error.message)
    }
  }

  const upVoteClickHandler = (event) => {
    setUserVote({
      hasVoted: true,
      value: 1
    })
    upVoteHandler(event)
    // if (userVote.hasVoted) {
    //   editVote(userVote.value)
    // } else {
    //   debugger
    // }
  }

  const upVoteHandler = (event) => {
    event.preventDefault()
    newVote(userVote)
  }

  useEffect(() => {
    fetchVotes()
  }, [])

  let voteButtons = ''
  let editDeleteButtons = ''
  if (props.user !== null) {
    voteButtons =
      <div>
        <button className="button" onClick={upVoteClickHandler}>
          Upvote
        </button>
        <button className="button" >
          Downvote
        </button>
        {totalVotes.value}
      </div>
    if (props.user.id === props.podcast.userId) {
      editDeleteButtons =
        <div>
          <Link to={`/podcasts/${props.podcast.id}/edit`} className="button">
            Edit
          </Link>
          <Link to={`/podcasts/${props.podcast.id}/delete`} className="button">
            Delete
          </Link>
        </div>
    }
  }
  return (
    <div className='callout primary'>
      <Link to={`/podcasts/${props.podcast.id}`}>
        <h1>{props.podcast.name}</h1>
        <p>{props.podcast.description}</p>
      </Link>
      {voteButtons}
      {editDeleteButtons}
    </div>
  )
}

export default PodcastTile