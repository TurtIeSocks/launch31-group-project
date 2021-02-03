import express from 'express'
import objection from 'objection'
const { ValidationError } = objection

import { Vote } from '../../../models/index.js'
// import cleanUserInput from '../../../services/cleanUserInput.js'
// import VoteSerializer from '../../../serializers/VoteSerializer.js'

const podcastVotesRouter = new express.Router({ mergeParams: true })

podcastVotesRouter.get('/', async (req, res) => {
  const { podcastId } = req.params
  const userId = req.user.id
  
  try {
    let votes = {}
    votes.userVote = await Vote.query()
      .where('podcastId', podcastId)
      .andWhere('userId', userId)
      .first()
    votes.totalVotes = await Vote.query()
      .where('podcastId', podcastId)
      .sum('value as value')
      .first()
    return res.status(201).json({ votes: votes })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

podcastVotesRouter.post('/', async (req, res) => {
  const { value } = req.body
  const { podcastId } = req.params
  const userId = req.user.id
  // debugger
  
  try {
    let newVote = {}
    newVote.userVote = await Vote.query().insertAndFetch({
      podcastId, userId, value
    })
    newVote.totalVotes = await Vote.query()
      .where('podcastId', podcastId)
      .sum('value as value')
      .first()
    // debugger
    return res.status(201).json({ votes: newVote })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default podcastVotesRouter