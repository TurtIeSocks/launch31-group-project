import express from 'express'
import objection from 'objection'
const { ValidationError } = objection

import { Vote } from '../../../models/index.js'
import VoteSerializer from '../../../serializers/VoteSerializer.js'

const podcastVotesRouter = new express.Router({ mergeParams: true })

podcastVotesRouter.post('/', async (req, res) => {
  const { value } = req.body
  const { podcastId } = req.params
  const userId = req.user.id

  try {
    const newVote = await Vote.query()
      .insert({ podcastId, userId, value })
      .returning('*')
    const serializedVote = await VoteSerializer.getSummary(newVote)
    const totalVotes = await Vote.query()
      .where('podcastId', podcastId)
      .sum('value as value')
      .first()
    return res.status(201).json({ vote: serializedVote, total: totalVotes })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

podcastVotesRouter.patch('/', async (req, res) => {
  const { value } = req.body
  const { podcastId } = req.params
  const userId = req.user.id

  try {
    const editedVote = await Vote.query()
      .findOne({ podcastId: podcastId, userId: userId})
      .update({ value: value })
      .returning('*')
    const serializedVote = await VoteSerializer.getSummary(editedVote)
    const totalVotes = await Vote.query()
      .where('podcastId', podcastId)
      .sum('value as value')
      .first()
    return res.status(201).json({ vote: serializedVote, total: totalVotes})
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

podcastVotesRouter.delete('/', async (req, res) => {
  const { podcastId } = req.params
  const userId = req.user.id

  try {
    await Vote.query()
      .findOne({ podcastId: podcastId, userId: userId})
      .delete()
    const totalVotes = await Vote.query()
      .where('podcastId', podcastId)
      .sum('value as value')
      .first()
    return res.status(201).json({ total: totalVotes })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

export default podcastVotesRouter
